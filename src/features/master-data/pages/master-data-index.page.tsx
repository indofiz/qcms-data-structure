import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import {
  Database,
  Package,
  Users,
  Building,
  FlaskConical,
  Ruler,
  Scale,
  FileText,
  Truck,
  TestTube,
  Settings,
  MapPin,
  Shield,
  UserCheck,
} from 'lucide-react'

interface MasterDataItem {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  path: string
}

const masterDataItems: MasterDataItem[] = [
  {
    title: 'Products',
    description: 'Manage product catalog and specifications',
    icon: Package,
    path: '/master-data/products',
  },
  {
    title: 'Raw Materials',
    description: 'Manage raw materials inventory and details',
    icon: Database,
    path: '/master-data/raw-materials',
  },
  {
    title: 'Suppliers',
    description: 'Manage supplier information and contacts',
    icon: Users,
    path: '/master-data/suppliers',
  },
  {
    title: 'Plants',
    description: 'Manage plant locations and facilities',
    icon: Building,
    path: '/master-data/plants',
  },
  {
    title: 'Departments',
    description: 'Manage organizational departments',
    icon: MapPin,
    path: '/master-data/departments',
  },
  {
    title: 'Categories',
    description: 'Manage raw material categories',
    icon: Settings,
    path: '/master-data/categories',
  },
  {
    title: 'Parameters',
    description: 'Manage quality control parameters',
    icon: FlaskConical,
    path: '/master-data/parameters',
  },
  {
    title: 'Analysis Parameters',
    description: 'Manage laboratory analysis parameters',
    icon: TestTube,
    path: '/master-data/analysis-parameters',
  },
  {
    title: 'Units',
    description: 'Manage measurement units',
    icon: Ruler,
    path: '/master-data/units',
  },
  {
    title: 'Units of Measurement',
    description: 'Manage units of measurement for materials',
    icon: Scale,
    path: '/master-data/units-of-measurement',
  },
  {
    title: 'COA Standardizations',
    description: 'Manage certificate of analysis standards',
    icon: FileText,
    path: '/master-data/coa-standardizations',
  },
  {
    title: 'Delivery Partners',
    description: 'Manage delivery and logistics partners',
    icon: Truck,
    path: '/master-data/delivery-partners',
  },
  {
    title: 'Roles',
    description: 'Manage system user roles and permissions',
    icon: Shield,
    path: '/master-data/roles',
  },
  {
    title: 'Positions',
    description: 'Manage organizational positions and job titles',
    icon: UserCheck,
    path: '/master-data/positions',
  },
]

export function MasterDataIndexPage() {
  const navigate = useNavigate()

  const handleCardClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Master Data Management
        </h1>
        <p className="text-muted-foreground text-lg">
          Centralized management for all master data entities in the Quality
          Control Management System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {masterDataItems.map((item) => {
          const IconComponent = item.icon
          return (
            <Card
              key={item.path}
              className="group relative overflow-hidden border hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/20"
              onClick={() => handleCardClick(item.path)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed min-h-[2.5rem]">
                  {item.description}
                </CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors"
                >
                  Manage Data
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
