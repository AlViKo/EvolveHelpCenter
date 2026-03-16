import {
  ShieldCheck,
  LayoutDashboard,
  Building2,
  BookOpen,
  Rocket,
  BarChart3,
  Lock,
  HelpCircle,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  'shield-check': ShieldCheck,
  'layout-dashboard': LayoutDashboard,
  'building-2': Building2,
  'book-open': BookOpen,
  'rocket': Rocket,
  'bar-chart-3': BarChart3,
  'lock': Lock,
}

interface Props {
  name: string
  size?: number
}

export default function CollectionIcon({ name, size = 20 }: Props) {
  const Icon = ICON_MAP[name] ?? HelpCircle
  return <Icon size={size} />
}
