const EmployeeLeave = require('../../models/employee/leaveModel');

class EmployeeLeaveBalanceController {

    // Static method: Get current balance for employee
    static async getCurrentBalance(employeeId) {
        return await EmployeeLeave.findOne({ employeeId, isActive: true }).populate('employeeId');
    }

    // Static method: Add history entry
    static async addHistoryEntry(employeeId, historyData) {
        return await EmployeeLeave.findOneAndUpdate(
            { employeeId, isActive: true },
            { 
                $push: { leaveHistory: historyData },
                lastUpdated: new Date()
            },
            { new: true }
        );
    }

    // Static method: Switch leave type
    static async switchLeaveTypeHelper(employeeId, newLeaveType, notes) {
        const current = await EmployeeLeave.findOne({ employeeId, isActive: true });
        if (!current) throw new Error('Employee leave record not found');
        
        const oldLeaveType = current.leaveType;
        if (oldLeaveType === newLeaveType) throw new Error('Employee already has this leave type');
        
        // Add history entry for type switch
        await EmployeeLeaveBalanceController.addHistoryEntry(employeeId, {
            adjustmentType: 'Switched leave type',
            fromLeaveType: oldLeaveType,
            toLeaveType: newLeaveType,
            unit: 'Days',
            adjustment: 0,
            balance: current.fixedBalance || current.accruedBalanceHours || current.rolledUpBalance || 0,
            status: 'Approved',
            approvedBy: null,
            approvedDate: new Date(),
            notes: notes || `Switched from ${oldLeaveType} to ${newLeaveType}`,
            createdBy: null
        });
        
        // Update leave type
        return await EmployeeLeave.findOneAndUpdate(
            { employeeId, isActive: true },
            { 
                leaveType: newLeaveType,
                lastUpdated: new Date()
            },
            { new: true }
        );
    }

    // Get employee's current leave balance
    static async getEmployeeLeaveBalance(req, res) {
        try {
            const { employeeId } = req.params;

            const leaveBalance = await EmployeeLeaveBalanceController.getCurrentBalance(employeeId);

            if (!leaveBalance) {
                return res.status(404).json({
                    message: "Leave balance not found for this employee",
                });
            }

            return res.status(200).json({
                message: "Leave balance fetched successfully",
                data: leaveBalance,
            });

        } catch (err) {
            console.error("Get Leave Balance Error:", err);
            return res.status(500).json({
                message: "Server error",
                error: err.message,
            });
        }
    }

    // Switch leave type
    static async switchLeaveType(req, res) {
        try {
            const { employeeId } = req.params;
            const { newLeaveType, notes } = req.body;

            if (!['Fixed', 'Accrued', 'Rolled Up'].includes(newLeaveType)) {
                return res.status(400).json({
                    message: "Invalid leave type",
                });
            }

            const updatedLeave = await EmployeeLeaveBalanceController.switchLeaveTypeHelper(
                employeeId, 
                newLeaveType, 
                notes
            );

            return res.status(200).json({
                message: `Leave type successfully switched to ${newLeaveType}`,
                data: updatedLeave
            });

        } catch (err) {
            console.error("Switch Leave Type Error:", err);
            return res.status(500).json({
                message: "Server error",
                error: err.message,
            });
        }
    }

    // Add balance adjustment
    static async addBalanceAdjustment(req, res) {
        try {
            const { employeeId } = req.params;
            const { adjustment, unit, notes, leaveRefreshDate } = req.body;

            if (!adjustment || !unit) {
                return res.status(400).json({
                    message: "Adjustment and unit are required",
                });
            }

            const leaveBalance = await EmployeeLeaveBalanceController.getCurrentBalance(employeeId);

            if (!leaveBalance) {
                return res.status(404).json({
                    message: "Leave balance not found",
                });
            }

            // Update balance based on leave type
            let newBalance = 0;
            let updateField = {};
            
            if (leaveBalance.leaveType === 'Fixed') {
                newBalance = leaveBalance.fixedBalance + adjustment;
                updateField.fixedBalance = newBalance;
            } else if (leaveBalance.leaveType === 'Accrued') {
                newBalance = leaveBalance.accruedBalanceHours + adjustment;
                updateField.accruedBalanceHours = newBalance;
            } else if (leaveBalance.leaveType === 'Rolled Up') {
                newBalance = leaveBalance.rolledUpBalance + adjustment;
                updateField.rolledUpBalance = newBalance;
            }

            // Update balance
            const updatedLeave = await EmployeeLeave.findOneAndUpdate(
                { employeeId, isActive: true },
                { 
                    ...updateField,
                    leaveRefreshDate: leaveRefreshDate || leaveBalance.leaveRefreshDate,
                    lastUpdated: new Date()
                },
                { new: true }
            );

            // Add history entry
            await EmployeeLeaveBalanceController.addHistoryEntry(employeeId, {
                adjustmentType: 'Balance Adjustment',
                unit,
                adjustment,
                balance: newBalance,
                status: 'Approved',
                approvedBy: req.user?.id || null,
                approvedDate: new Date(),
                notes: notes || `Balance adjustment of ${adjustment} ${unit}`,
                createdBy: req.user?.id || null
            });

            return res.status(200).json({
                message: "Balance adjustment added successfully",
                data: {
                    adjustment,
                    unit,
                    newBalance,
                    updatedLeave
                }
            });

        } catch (err) {
            console.error("Add Balance Adjustment Error:", err);
            return res.status(500).json({
                message: "Server error",
                error: err.message,
            });
        }
    }

    // Get leave balance history
    static async getLeaveBalanceHistory(req, res) {
        try {
            const { employeeId } = req.params;
            const { page = 1, limit = 10 } = req.query;

            const leaveRecord = await EmployeeLeave.findOne({ employeeId, isActive: true })
                .populate('leaveHistory.submittedTo', 'firstName lastName')
                .populate('leaveHistory.approvedBy', 'firstName lastName')
                .populate('leaveHistory.createdBy', 'firstName lastName');

            if (!leaveRecord) {
                return res.status(404).json({
                    message: "Leave record not found for this employee",
                });
            }

            // Sort history by creation date (newest first)
            const sortedHistory = leaveRecord.leaveHistory.sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );

            // Pagination
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + parseInt(limit);
            const paginatedHistory = sortedHistory.slice(startIndex, endIndex);

            return res.status(200).json({
                message: "Leave balance history fetched successfully",
                data: paginatedHistory,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: sortedHistory.length,
                    pages: Math.ceil(sortedHistory.length / limit)
                }
            });

        } catch (err) {
            console.error("Get Leave Balance History Error:", err);
            return res.status(500).json({
                message: "Server error",
                error: err.message,
            });
        }
    }

    // Update history record status
    static async updateHistoryStatus(req, res) {
        try {
            const { employeeId, historyId } = req.params;
            const { status, notes } = req.body;

            if (!['Pending', 'Approved', 'Rejected', 'Update'].includes(status)) {
                return res.status(400).json({
                    message: "Invalid status",
                });
            }

            const leaveRecord = await EmployeeLeave.findOne({ employeeId, isActive: true });

            if (!leaveRecord) {
                return res.status(404).json({
                    message: "Leave record not found",
                });
            }

            // Find and update the specific history entry
            const historyEntry = leaveRecord.leaveHistory.id(historyId);
            if (!historyEntry) {
                return res.status(404).json({
                    message: "History record not found",
                });
            }

            historyEntry.status = status;
            historyEntry.approvedBy = req.user?.id || null;
            historyEntry.approvedDate = status === 'Approved' ? new Date() : null;
            if (notes) historyEntry.notes = notes;

            await leaveRecord.save();

            return res.status(200).json({
                message: "History status updated successfully",
                data: historyEntry
            });

        } catch (err) {
            console.error("Update History Status Error:", err);
            return res.status(500).json({
                message: "Server error",
                error: err.message,
            });
        }
    }

    // Initialize leave balance for new employee
    static async initializeLeaveBalance(req, res) {
        try {
            const { employeeId, leaveType, initialBalance, leaveRefreshDate } = req.body;

            if (!employeeId || !leaveType) {
                return res.status(400).json({
                    message: "Employee ID and leave type are required",
                });
            }

            // Check if balance already exists
            const existingBalance = await EmployeeLeaveBalanceController.getCurrentBalance(employeeId);

            if (existingBalance) {
                return res.status(400).json({
                    message: "Leave balance already exists for this employee",
                });
            }

            // Create new leave record
            const newLeave = await EmployeeLeave.create({
                employeeId,
                leaveType,
                fixedBalance: leaveType === 'Fixed' ? (initialBalance || 0) : 0,
                accruedBalanceHours: leaveType === 'Accrued' ? (initialBalance || 0) : 0,
                rolledUpBalance: leaveType === 'Rolled Up' ? (initialBalance || 0) : 0,
                leaveRefreshDate: leaveRefreshDate || null,
                isActive: true,
                leaveHistory: [{
                    adjustmentType: 'Balance Adjustment',
                    unit: leaveType === 'Accrued' ? 'Hours' : 'Days',
                    adjustment: initialBalance || 0,
                    balance: initialBalance || 0,
                    status: 'Approved',
                    approvedBy: req.user?.id || null,
                    approvedDate: new Date(),
                    notes: 'Initial balance setup',
                    createdBy: req.user?.id || null
                }]
            });

            return res.status(201).json({
                message: "Leave balance initialized successfully",
                data: newLeave
            });

        } catch (err) {
            console.error("Initialize Leave Balance Error:", err);
            return res.status(500).json({
                message: "Server error",
                error: err.message,
            });
        }
    }
}

module.exports = EmployeeLeaveBalanceController;
