# Company Module – API Flow & Endpoints

Base URL: `/api/company`

**Auth:** Company sub-module routes use `Authorization: Bearer <token>` (company login token).  
`req.user.id` = company ID from JWT.

---

## 1. Company (existing)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | auth | Company registration |
| POST | `/login` | - | Company login (returns token) |
| POST | `/forgetpassword` | - | Forget password |
| PUT | `/request/:id/status` | auth + SuperAdmin | Approve/Reject company |
| GET | `/getAllCompanies` | auth + SuperAdmin | List companies (optional ?status=) |
| GET | `/getAllCompanies/:status` | auth + SuperAdmin | List by status |

---

## 2. Holidays – `/holidays`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company/holidays` | List (query: country, state, year) |
| GET | `/api/company/holidays/meta/countries` | Countries for dropdown |
| GET | `/api/company/holidays/meta/states?country=UK` | States by country |
| GET | `/api/company/holidays/meta/years` | Years for dropdown |
| GET | `/api/company/holidays/:id` | Get one holiday |
| POST | `/api/company/holidays` | Create (body: description, date, startTime, endTime, country?, state?, year?) |
| PUT | `/api/company/holidays/:id` | Update |
| DELETE | `/api/company/holidays/:id` | Delete |

---

## 3. Skills – `/skills`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company/skills` | List skills |
| GET | `/api/company/skills/:id` | Get one skill |
| POST | `/api/company/skills` | Create (body: name, description?, isActive?) |
| PUT | `/api/company/skills/:id` | Update |
| DELETE | `/api/company/skills/:id` | Delete |

---

## 4. Compliance / Renewals – `/compliance-items`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company/compliance-items` | List compliance items |
| GET | `/api/company/compliance-items/:id` | Get one item |
| GET | `/api/company/compliance-items/:id/renewals` | List renewals |
| POST | `/api/company/compliance-items` | Create (name, description?, reminder?, critical?, showToCustomer?, isActive?) |
| POST | `/api/company/compliance-items/:id/renewals` | Add renewal (renewedAt?, expiryDate?, notes?) |
| PUT | `/api/company/compliance-items/:id` | Update item |
| DELETE | `/api/company/compliance-items/:id` | Delete item |

---

## 5. Role Templates – `/role-templates`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company/role-templates` | List role templates |
| GET | `/api/company/role-templates/:id` | Get one |
| POST | `/api/company/role-templates` | Create (name, securityLicenceRequirements?, critical?, showToCustomer?, isActive?) |
| PUT | `/api/company/role-templates/:id` | Update |
| DELETE | `/api/company/role-templates/:id` | Delete |

---

## 6. Company Documents – `/documents`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company/documents` | List documents |
| GET | `/api/company/documents/:id` | Get document metadata |
| GET | `/api/company/documents/:id/download` | Download file |
| POST | `/api/company/documents` | Upload (multipart: file + name, allowAllStaffToView?, requiresAcknowledgementBeforeShift?, expireOnOrBefore?, expirePeriod?) |
| PUT | `/api/company/documents/:id` | Update metadata |
| DELETE | `/api/company/documents/:id` | Delete document |

---

## 7. Data Import – `/data-import`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company/data-import/types` | List import types (employees, skills, sites, etc.) |
| GET | `/api/company/data-import` | List import jobs |
| GET | `/api/company/data-import/:jobId/status` | Job status |
| POST | `/api/company/data-import` | Start import (multipart: file + importType) |

---

## 8. Site Position Lookups – `/site-positions`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/company/site-positions` | List site positions |
| GET | `/api/company/site-positions/:id` | Get one |
| POST | `/api/company/site-positions` | Create (name, description?, isActive?) |
| PUT | `/api/company/site-positions/:id` | Update |
| DELETE | `/api/company/site-positions/:id` | Delete |

---

## Flow (Company login → sub-modules)

1. Company **login** → `POST /api/company/login` → response has `token`, `id`.
2. Use header: `Authorization: Bearer <token>`.
3. Backend uses `req.user.id` (from JWT) as `companyId` for all sub-module APIs.
4. All list/create/update/delete are scoped to that company.

Files added:

- **Models:** `holidayModel`, `skillModel`, `complianceItemModel`, `roleTemplateModel`, `companyDocumentModel`, `dataImportJobModel`, `sitePositionModel`
- **DTOs:** `holiday.dto`, `skill.dto`, `compliance.dto`, `roleTemplate.dto`, `document.dto`, `dataImport.dto`, `sitePosition.dto`
- **Controllers:** `holidayController`, `skillController`, `complianceController`, `roleTemplateController`, `documentController`, `dataImportController`, `sitePositionController`
- **Routes:** `holidayRoutes`, `skillRoutes`, `complianceRoutes`, `roleTemplateRoutes`, `documentRoutes`, `dataImportRoutes`, `sitePositionRoutes` (mounted in `companyRoute.js`)
- **Middleware:** `uploadMiddleware.js` (multer) for documents and data-import file uploads
