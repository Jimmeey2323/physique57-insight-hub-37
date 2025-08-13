
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModernDataTable } from '@/components/ui/ModernDataTable';
import { 
  Users, 
  DollarSign, 
  Target, 
  Activity, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Zap
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/formatters';

export const ExecutiveDataTablesGrid = () => {
  // Sample data for each table
  const salesData = [
    { seller: 'Sarah Johnson', revenue: 45230, transactions: 67, avgValue: 675, location: 'Downtown' },
    { seller: 'Mike Rodriguez', revenue: 42150, transactions: 59, avgValue: 714, location: 'Uptown' },
    { seller: 'Lisa Chen', revenue: 38970, transactions: 62, avgValue: 628, location: 'Midtown' },
    { seller: 'David Kim', revenue: 36540, transactions: 58, avgValue: 630, location: 'Westside' },
    { seller: 'Emma Wilson', revenue: 34120, transactions: 55, avgValue: 620, location: 'Eastside' }
  ];

  const leadSourceData = [
    { source: 'Website', leads: 234, conversions: 56, conversionRate: 23.9, avgLTV: 892 },
    { source: 'Referrals', leads: 189, conversions: 67, conversionRate: 35.4, avgLTV: 1245 },
    { source: 'Social Media', leads: 156, conversions: 32, conversionRate: 20.5, avgLTV: 678 },
    { source: 'Google Ads', leads: 134, conversions: 28, conversionRate: 20.9, avgLTV: 734 },
    { source: 'Walk-ins', leads: 98, conversions: 31, conversionRate: 31.6, avgLTV: 956 }
  ];

  const trainerData = [
    { trainer: 'Sarah Martinez', sessions: 78, customers: 245, revenue: 18750, retention: 87.2 },
    { trainer: 'Mike Thompson', sessions: 72, customers: 228, revenue: 17340, retention: 84.1 },
    { trainer: 'Lisa Anderson', sessions: 69, customers: 215, revenue: 16890, retention: 82.8 },
    { trainer: 'John Parker', sessions: 65, customers: 198, revenue: 15670, retention: 79.4 },
    { trainer: 'Emma Davis', sessions: 61, customers: 189, revenue: 14520, retention: 81.2 }
  ];

  const sessionData = [
    { class: 'PowerCycle Advanced', attendance: 89, capacity: 95, utilization: 93.7, revenue: 2340 },
    { class: 'Barre Foundations', attendance: 76, capacity: 85, utilization: 89.4, revenue: 1980 },
    { class: 'HIIT Cardio', attendance: 68, capacity: 80, utilization: 85.0, revenue: 1760 },
    { class: 'Yoga Flow', attendance: 52, capacity: 65, utilization: 80.0, revenue: 1350 },
    { class: 'Strength Training', attendance: 45, capacity: 60, utilization: 75.0, revenue: 1170 }
  ];

  const locationData = [
    { location: 'Downtown', revenue: 125430, members: 456, sessions: 234, conversion: 28.4 },
    { location: 'Uptown', revenue: 98750, members: 378, sessions: 198, conversion: 25.7 },
    { location: 'Midtown', revenue: 87690, members: 334, sessions: 176, conversion: 23.1 },
    { location: 'Westside', revenue: 76540, members: 298, sessions: 154, conversion: 21.8 },
    { location: 'Eastside', revenue: 65420, members: 267, sessions: 132, conversion: 20.3 }
  ];

  const membershipData = [
    { type: 'Premium Unlimited', sales: 89, revenue: 26700, avgPrice: 300, retention: 92.1 },
    { type: 'Standard Monthly', sales: 156, revenue: 23400, avgPrice: 150, retention: 78.4 },
    { type: 'Class Packages', sales: 234, revenue: 18720, avgPrice: 80, retention: 65.2 },
    { type: 'Drop-in Single', sales: 345, revenue: 10350, avgPrice: 30, retention: 15.8 },
    { type: 'Corporate', sales: 23, revenue: 13800, avgPrice: 600, retention: 89.7 }
  ];

  const clientConversionData = [
    { period: 'Week 1', newClients: 45, conversions: 12, retentions: 38, avgLTV: 856 },
    { period: 'Week 2', newClients: 52, conversions: 16, retentions: 43, avgLTV: 912 },
    { period: 'Week 3', newClients: 38, conversions: 11, retentions: 29, avgLTV: 778 },
    { period: 'Week 4', newClients: 61, conversions: 18, retentions: 49, avgLTV: 934 }
  ];

  const powerCycleBarreData = [
    { metric: 'Total Sessions', powerCycle: 342, barre: 287, difference: 55 },
    { metric: 'Average Attendance', powerCycle: 18.5, barre: 15.2, difference: 3.3 },
    { metric: 'Revenue Generated', powerCycle: 68400, barre: 57400, difference: 11000 },
    { metric: 'Member Preference', powerCycle: 64.2, barre: 35.8, difference: 28.4 }
  ];

  const salesColumns = [
    { key: 'seller', header: 'Sales Person', className: 'font-semibold' },
    { key: 'revenue', header: 'Revenue', render: (value: number) => formatCurrency(value), align: 'right' as const },
    { key: 'transactions', header: 'Transactions', align: 'center' as const },
    { key: 'avgValue', header: 'Avg Value', render: (value: number) => formatCurrency(value), align: 'right' as const },
    { key: 'location', header: 'Location' }
  ];

  const leadColumns = [
    { key: 'source', header: 'Lead Source', className: 'font-semibold' },
    { key: 'leads', header: 'Total Leads', align: 'center' as const },
    { key: 'conversions', header: 'Conversions', align: 'center' as const },
    { key: 'conversionRate', header: 'Conv. Rate', render: (value: number) => `${value}%`, align: 'center' as const },
    { key: 'avgLTV', header: 'Avg LTV', render: (value: number) => formatCurrency(value), align: 'right' as const }
  ];

  const trainerColumns = [
    { key: 'trainer', header: 'Trainer', className: 'font-semibold' },
    { key: 'sessions', header: 'Sessions', align: 'center' as const },
    { key: 'customers', header: 'Customers', align: 'center' as const },
    { key: 'revenue', header: 'Revenue', render: (value: number) => formatCurrency(value), align: 'right' as const },
    { key: 'retention', header: 'Retention', render: (value: number) => `${value}%`, align: 'center' as const }
  ];

  const sessionColumns = [
    { key: 'class', header: 'Class Type', className: 'font-semibold' },
    { key: 'attendance', header: 'Attendance', align: 'center' as const },
    { key: 'capacity', header: 'Capacity', align: 'center' as const },
    { key: 'utilization', header: 'Utilization', render: (value: number) => `${value}%`, align: 'center' as const },
    { key: 'revenue', header: 'Revenue', render: (value: number) => formatCurrency(value), align: 'right' as const }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Comprehensive Data Analysis</h2>
        <p className="text-slate-600">Detailed performance tables across all business segments</p>
        <Badge className="bg-blue-100 text-blue-800 mt-2">8 Data Tables</Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Sales Performance Table */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Top Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModernDataTable
              data={salesData}
              columns={salesColumns}
              maxHeight="300px"
            />
          </CardContent>
        </Card>

        {/* Lead Source Performance */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Lead Source Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModernDataTable
              data={leadSourceData}
              columns={leadColumns}
              maxHeight="300px"
            />
          </CardContent>
        </Card>

        {/* Trainer Performance */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Trainer Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModernDataTable
              data={trainerData}
              columns={trainerColumns}
              maxHeight="300px"
            />
          </CardContent>
        </Card>

        {/* Session Utilization */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Session Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModernDataTable
              data={sessionData}
              columns={sessionColumns}
              maxHeight="300px"
            />
          </CardContent>
        </Card>
      </div>

      {/* Full-width tables */}
      <div className="space-y-8">
        {/* Location Performance */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Location Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModernDataTable
              data={locationData}
              columns={[
                { key: 'location', header: 'Location', className: 'font-semibold' },
                { key: 'revenue', header: 'Revenue', render: (value: number) => formatCurrency(value), align: 'right' as const },
                { key: 'members', header: 'Members', align: 'center' as const },
                { key: 'sessions', header: 'Sessions', align: 'center' as const },
                { key: 'conversion', header: 'Conversion Rate', render: (value: number) => `${value}%`, align: 'center' as const }
              ]}
              maxHeight="400px"
            />
          </CardContent>
        </Card>

        {/* Membership Type Analysis */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Membership Type Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModernDataTable
              data={membershipData}
              columns={[
                { key: 'type', header: 'Membership Type', className: 'font-semibold' },
                { key: 'sales', header: 'Sales Count', align: 'center' as const },
                { key: 'revenue', header: 'Revenue', render: (value: number) => formatCurrency(value), align: 'right' as const },
                { key: 'avgPrice', header: 'Avg Price', render: (value: number) => formatCurrency(value), align: 'right' as const },
                { key: 'retention', header: 'Retention', render: (value: number) => `${value}%`, align: 'center' as const }
              ]}
              maxHeight="400px"
            />
          </CardContent>
        </Card>

        {/* Client Conversion Weekly */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Client Conversion Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModernDataTable
              data={clientConversionData}
              columns={[
                { key: 'period', header: 'Period', className: 'font-semibold' },
                { key: 'newClients', header: 'New Clients', align: 'center' as const },
                { key: 'conversions', header: 'Conversions', align: 'center' as const },
                { key: 'retentions', header: 'Retentions', align: 'center' as const },
                { key: 'avgLTV', header: 'Avg LTV', render: (value: number) => formatCurrency(value), align: 'right' as const }
              ]}
              maxHeight="400px"
            />
          </CardContent>
        </Card>

        {/* PowerCycle vs Barre Comparison */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              PowerCycle vs Barre Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ModernDataTable
              data={powerCycleBarreData}
              columns={[
                { key: 'metric', header: 'Metric', className: 'font-semibold' },
                { key: 'powerCycle', header: 'PowerCycle', align: 'center' as const },
                { key: 'barre', header: 'Barre', align: 'center' as const },
                { key: 'difference', header: 'Difference', align: 'center' as const, render: (value: number) => `+${value}` }
              ]}
              maxHeight="400px"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
