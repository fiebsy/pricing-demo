/**
 * Stacking Nav + Table Playground - Mock Data
 *
 * Generates ~80 deterministic employees distributed across
 * 3 companies, 10 departments, and 27 teams.
 */

import {
  type Employee,
  EmployeeStatus,
  SeniorityLevel,
  PerformanceRating,
} from '../config/types'

// =============================================================================
// SEEDED RANDOM GENERATOR
// =============================================================================

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

const randomFromArray = <T>(arr: T[], seed: number): T => {
  const index = Math.floor(seededRandom(seed) * arr.length)
  return arr[index]
}

const randomInRange = (min: number, max: number, seed: number): number => {
  return min + seededRandom(seed) * (max - min)
}

const randomIntInRange = (min: number, max: number, seed: number): number => {
  return Math.floor(randomInRange(min, max, seed))
}

// =============================================================================
// DATA CONSTANTS
// =============================================================================

const FIRST_NAMES = [
  'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
  'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
]

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
]

const STATUSES = [
  EmployeeStatus.Active,
  EmployeeStatus.Active,
  EmployeeStatus.Active,
  EmployeeStatus.Active,
  EmployeeStatus.Remote,
  EmployeeStatus.Remote,
  EmployeeStatus.OnLeave,
  EmployeeStatus.Contractor,
]

const LEVELS = [
  SeniorityLevel.Junior,
  SeniorityLevel.Junior,
  SeniorityLevel.Mid,
  SeniorityLevel.Mid,
  SeniorityLevel.Mid,
  SeniorityLevel.Senior,
  SeniorityLevel.Senior,
  SeniorityLevel.Lead,
  SeniorityLevel.Director,
]

const RATINGS = [
  PerformanceRating.Exceeds,
  PerformanceRating.Meets,
  PerformanceRating.Meets,
  PerformanceRating.Meets,
  PerformanceRating.Developing,
  PerformanceRating.New,
]

// =============================================================================
// COMPANY / DEPARTMENT / TEAM STRUCTURE
// =============================================================================

interface TeamDef {
  id: string
  label: string
  roles: string[]
}

interface DeptDef {
  id: string
  label: string
  teams: TeamDef[]
}

interface CompanyDef {
  id: string
  label: string
  departments: DeptDef[]
  emailDomain: string
}

const COMPANIES: CompanyDef[] = [
  {
    id: 'acme',
    label: 'Acme Corp',
    emailDomain: 'acmecorp.com',
    departments: [
      {
        id: 'acme-eng',
        label: 'Engineering',
        teams: [
          { id: 'acme-eng-fe', label: 'Frontend', roles: ['Frontend Engineer', 'UI Engineer', 'React Developer'] },
          { id: 'acme-eng-be', label: 'Backend', roles: ['Backend Engineer', 'API Developer', 'Systems Engineer'] },
          { id: 'acme-eng-devops', label: 'DevOps', roles: ['DevOps Engineer', 'SRE', 'Cloud Engineer'] },
        ],
      },
      {
        id: 'acme-design',
        label: 'Design',
        teams: [
          { id: 'acme-design-product', label: 'Product Design', roles: ['Product Designer', 'UX Designer', 'Interaction Designer'] },
          { id: 'acme-design-brand', label: 'Brand Design', roles: ['Brand Designer', 'Visual Designer', 'Creative Director'] },
        ],
      },
      {
        id: 'acme-sales',
        label: 'Sales',
        teams: [
          { id: 'acme-sales-ent', label: 'Enterprise Sales', roles: ['Enterprise AE', 'Solutions Engineer', 'Sales Director'] },
          { id: 'acme-sales-smb', label: 'SMB Sales', roles: ['Account Executive', 'SDR', 'Sales Manager'] },
        ],
      },
      {
        id: 'acme-ops',
        label: 'Operations',
        teams: [
          { id: 'acme-ops-hr', label: 'Human Resources', roles: ['HR Manager', 'Recruiter', 'People Ops'] },
          { id: 'acme-ops-finance', label: 'Finance', roles: ['Financial Analyst', 'Controller', 'Accountant'] },
        ],
      },
    ],
  },
  {
    id: 'globex',
    label: 'Globex',
    emailDomain: 'globex.io',
    departments: [
      {
        id: 'globex-eng',
        label: 'Engineering',
        teams: [
          { id: 'globex-eng-platform', label: 'Platform', roles: ['Platform Engineer', 'Infra Engineer', 'Build Engineer'] },
          { id: 'globex-eng-mobile', label: 'Mobile', roles: ['iOS Developer', 'Android Developer', 'Mobile Lead'] },
          { id: 'globex-eng-data', label: 'Data Engineering', roles: ['Data Engineer', 'ML Engineer', 'Analytics Engineer'] },
        ],
      },
      {
        id: 'globex-product',
        label: 'Product',
        teams: [
          { id: 'globex-product-growth', label: 'Growth', roles: ['Growth PM', 'Product Analyst', 'Experimentation Lead'] },
          { id: 'globex-product-core', label: 'Core Product', roles: ['Senior PM', 'Product Manager', 'Technical PM'] },
        ],
      },
      {
        id: 'globex-mktg',
        label: 'Marketing',
        teams: [
          { id: 'globex-mktg-content', label: 'Content Marketing', roles: ['Content Strategist', 'Copywriter', 'Editor'] },
          { id: 'globex-mktg-demand', label: 'Demand Gen', roles: ['Demand Gen Manager', 'Campaign Manager', 'Marketing Ops'] },
        ],
      },
    ],
  },
  {
    id: 'initech',
    label: 'Initech',
    emailDomain: 'initech.co',
    departments: [
      {
        id: 'initech-eng',
        label: 'Engineering',
        teams: [
          { id: 'initech-eng-infra', label: 'Infrastructure', roles: ['Infra Engineer', 'Network Engineer', 'Systems Admin'] },
          { id: 'initech-eng-security', label: 'Security', roles: ['Security Engineer', 'Pen Tester', 'Security Analyst'] },
          { id: 'initech-eng-qa', label: 'QA', roles: ['QA Engineer', 'Test Automation', 'QA Lead'] },
        ],
      },
      {
        id: 'initech-support',
        label: 'Support',
        teams: [
          { id: 'initech-support-tier1', label: 'Tier 1 Support', roles: ['Support Agent', 'Customer Success', 'Help Desk'] },
          { id: 'initech-support-tier2', label: 'Tier 2 Support', roles: ['Senior Support', 'Technical Support', 'Escalation Eng'] },
        ],
      },
      {
        id: 'initech-legal',
        label: 'Legal',
        teams: [
          { id: 'initech-legal-contracts', label: 'Contracts', roles: ['Contract Manager', 'Legal Counsel', 'Paralegal'] },
          { id: 'initech-legal-compliance', label: 'Compliance', roles: ['Compliance Officer', 'Risk Analyst', 'Audit Manager'] },
        ],
      },
    ],
  },
]

// =============================================================================
// DATA GENERATOR
// =============================================================================

/**
 * Generate ~80 employees distributed across the company hierarchy.
 * Distribution aims for 25-30 per company, 8-12 per department, 3-5 per team.
 */
const generateEmployees = (): Employee[] => {
  const employees: Employee[] = []
  let globalIndex = 0

  // Target ~3 employees per team, yielding ~81 total (27 teams * 3)
  // Some teams get 2, some get 4 for variety
  for (const company of COMPANIES) {
    for (const dept of company.departments) {
      for (const team of dept.teams) {
        // Vary team size: 2-4 employees per team
        const teamSize = 2 + randomIntInRange(0, 3, globalIndex * 7 + 42)

        for (let i = 0; i < teamSize; i++) {
          const seed = globalIndex * 100 + i * 13 + 1
          const firstName = randomFromArray(FIRST_NAMES, seed)
          const lastName = randomFromArray(LAST_NAMES, seed + 1)
          const name = `${firstName} ${lastName}`
          const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.emailDomain}`
          const role = randomFromArray(team.roles, seed + 2)
          const status = randomFromArray(STATUSES, seed + 3)
          const level = randomFromArray(LEVELS, seed + 4)
          const performance = randomFromArray(RATINGS, seed + 5)
          const salary = randomIntInRange(55000, 195000, seed + 6)
          const daysAgo = randomIntInRange(30, 1800, seed + 7)
          const startDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
          const projectCount = randomIntInRange(0, 12, seed + 8)

          employees.push({
            id: 1000 + globalIndex * 10 + i,
            name,
            email,
            role,
            company: company.id,
            companyLabel: company.label,
            department: dept.id,
            departmentLabel: dept.label,
            team: team.id,
            teamLabel: team.label,
            status,
            level,
            salary,
            startDate,
            performance,
            projectCount,
          })
        }

        globalIndex++
      }
    }
  }

  return employees
}

// =============================================================================
// LAZY INITIALIZATION
// =============================================================================

let _employees: Employee[] | null = null

export const EMPLOYEE_DATA: Employee[] = new Proxy([] as Employee[], {
  get(target, prop) {
    if (_employees === null) {
      _employees = generateEmployees()
    }
    return Reflect.get(_employees, prop)
  },
  set(target, prop, value) {
    if (_employees === null) {
      _employees = generateEmployees()
    }
    return Reflect.set(_employees, prop, value)
  },
})

export { generateEmployees }
