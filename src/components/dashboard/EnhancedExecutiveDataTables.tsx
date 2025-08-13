
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModernDataTable } from '@/components/ui/ModernDataTable';
import { 
  DollarSign, 
  Users, 
  Target, 
  Activity,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  UserCheck,
  Zap,
  BarChart3
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface EnhancedExecutiveDataTablesProps {
  data: {
    sales: any[];
    sessions: any[];
    payroll: any[];
    newClients: any[];
    leads: any[];
  };
  selectedLocation?: string | null;
}

export const EnhancedExecutiveDataTables: React.FC<EnhancedExecutiveDataTablesProps> = ({ 
  data, 
  selectedLocation 
}) => {
  // Filter data by location if selected
  const filteredData = useMemo(() => {
    if (!selectedLocation) return data;
    
    return {
      sales: data.sales.filter(s => !selectedLocation || s.calculatedLocation === selectedLocation),
      sessions: data.sessions.filter(s => !selectedLocation || s.location === selectedLocation),
      payroll: data.payroll.filter(p => !selectedLocation || p.location === selectedLocation),
      newClients: data.newClients.filter(c => !selectedLocation || c.homeLocation === selectedLocation),
      leads: data.leads.filter(l => !selectedLocation || l.location === selectedLocation)
    };
  }, [data, selectedLocation]);

  // Sales by Product Analysis
  const salesByProduct = useMemo(() => {
    const products = filteredData.sales.reduce((acc, sale) => {
      const product = sale.paymentItem || 'Unknown';
      if (!acc[product]) {
        acc[product] = { 
          product, 
          revenue: 0, 
          transactions: 0, 
          customers: new Set(),
          avgPrice: 0 
        };
      }
      acc[product].revenue += sale.paymentValue || 0;
      acc[product].transactions += 1;
      acc[product].customers.add(sale.memberId);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(products)
      .map((p: any) => ({
        ...p,
        customers: p.customers.size,
        avgPrice: p.transactions > 0 ? p.revenue / p.transactions : 0
      }))
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 15);
  }, [filteredData.sales]);

  // Sales by Category Analysis
  const salesByCategory = useMemo(() => {
    const categories = filteredData.sales.reduce((acc, sale) => {
      const category = sale.cleanedCategory || 'Unknown';
      if (!acc[category]) {
        acc[category] = { 
          category, 
          revenue: 0, 
          transactions: 0, 
          products: new Set() 
        };
      }
      acc[category].revenue += sale.paymentValue || 0;
      acc[category].transactions += 1;
      acc[category].products.add(sale.paymentItem);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(categories)
      .map((c: any) => ({
        ...c,
        products: c.products.size,
        avgTransaction: c.transactions > 0 ? c.revenue / c.transactions : 0
      }))
      .sort((a: any, b: any) => b.revenue - a.revenue);
  }, [filteredData.sales]);

  // Leads by Source and Conversion
  const leadsBySource = useMemo(() => {
    const sources = filteredData.leads.reduce((acc, lead) => {
      const source = lead.source || 'Unknown';
      if (!acc[source]) {
        acc[source] = { 
          source, 
          totalLeads: 0, 
          conversions: 0, 
          conversionRate: 0,
          avgLTV: 0,
          totalLTV: 0
        };
      }
      acc[source].totalLeads += 1;
      if (lead.conversionStatus === 'Converted') {
        acc[source].conversions += 1;
        acc[source].totalLTV += lead.ltv || 0;
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(sources)
      .map((s: any) => ({
        ...s,
        conversionRate: s.totalLeads > 0 ? (s.conversions / s.totalLeads) * 100 : 0,
        avgLTV: s.conversions > 0 ? s.totalLTV / s.conversions : 0
      }))
      .sort((a: any, b: any) => b.conversions - a.conversions);
  }, [filteredData.leads]);

  // New Clients by Class with Conversions
  const newClientsByClass = useMemo(() => {
    const classes = filteredData.newClients.reduce((acc, client) => {
      const className = client.firstVisitType || 'Unknown';
      if (!acc[className]) {
        acc[className] = { 
          className, 
          totalClients: 0, 
          conversions: 0, 
          retained: 0,
          avgLTV: 0,
          totalLTV: 0
        };
      }
      acc[className].totalClients += 1;
      acc[className].totalLTV += client.ltv || 0;
      if (client.conversionStatus === 'Converted') {
        acc[className].conversions += 1;
      }
      if (client.retentionStatus === 'Retained') {
        acc[className].retained += 1;
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(classes)
      .map((c: any) => ({
        ...c,
        conversionRate: c.totalClients > 0 ? (c.conversions / c.totalClients) * 100 : 0,
        retentionRate: c.totalClients > 0 ? (c.retained / c.totalClients) * 100 : 0,
        avgLTV: c.totalClients > 0 ? c.totalLTV / c.totalClients : 0
      }))
      .sort((a: any, b: any) => b.totalClients - a.totalClients)
      .slice(0, 10);
  }, [filteredData.newClients]);

  // Class Performance Analysis
  const classPerformance = useMemo(() => {
    const classes = filteredData.sessions.reduce((acc, session) => {
      const className = session.cleanedClass || 'Unknown';
      if (!acc[className]) {
        acc[className] = { 
          className, 
          totalSessions: 0, 
          totalAttendance: 0, 
          totalCapacity: 0, 
          emptySessions: 0,
          highPerformingSessions: 0
        };
      }
      acc[className].totalSessions += 1;
      acc[className].totalAttendance += session.checkedInCount || 0;
      acc[className].totalCapacity += session.capacity || 0;
      
      if ((session.checkedInCount || 0) === 0) {
        acc[className].emptySessions += 1;
      }
      
      const fillRate = session.capacity > 0 ? (session.checkedInCount / session.capacity) * 100 : 0;
      if (fillRate >= 80) {
        acc[className].highPerformingSessions += 1;
      }
      
      return acc;
    }, {} as Record<string, any>);

    return Object.values(classes)
      .map((c: any) => ({
        ...c,
        avgFillRate: c.totalCapacity > 0 ? ((c.totalAttendance / c.totalCapacity) * 100) : 0,
        avgSessionSize: c.totalSessions > 0 ? (c.totalAttendance / c.totalSessions) : 0,
        emptySessionRate: c.totalSessions > 0 ? (c.emptySessions / c.totalSessions) * 100 : 0,
        highPerformanceRate: c.totalSessions > 0 ? (c.highPerformingSessions / c.totalSessions) * 100 : 0
      }))
      .sort((a: any, b: any) => b.avgFillRate - a.avgFillRate);
  }, [filteredData.sessions]);

  // Top and Bottom Products
  const topProducts = salesByProduct.slice(0, 5);
  const bottomProducts = salesByProduct.slice(-5).reverse();

  // Top and Bottom Trainers
  const trainerPerformance = useMemo(() => {
    return filteredData.payroll
      .map(trainer => ({
        ...trainer,
        fillRate: trainer.totalSessions > 0 ? ((trainer.totalCustomers / (trainer.totalSessions * 20)) * 100) : 0 // Assuming avg capacity of 20
      }))
      .sort((a, b) => (b.totalPaid || 0) - (a.totalPaid || 0));
  }, [filteredData.payroll]);

  const topTrainers = trainerPerformance.slice(0, 5);
  const bottomTrainers = trainerPerformance.slice(-5).reverse();

  // PowerCycle vs Barre Analysis
  const powerCycleVsBarre = useMemo(() => {
    const powerCycle = filteredData.sessions.filter(s => 
      s.cleanedClass?.toLowerCase().includes('cycle') || 
      s.cleanedClass?.toLowerCase().includes('power')
    );
    const barre = filteredData.sessions.filter(s => 
      s.cleanedClass?.toLowerCase().includes('barre')
    );

    const powerCycleMetrics = {
      type: 'PowerCycle',
      sessions: powerCycle.length,
      attendance: powerCycle.reduce((sum, s) => sum + (s.checkedInCount || 0), 0),
      capacity: powerCycle.reduce((sum, s) => sum + (s.capacity || 0), 0),
      avgFillRate: 0
    };

    const barreMetrics = {
      type: 'Barre',
      sessions: barre.length,
      attendance: barre.reduce((sum, s) => sum + (s.checkedInCount || 0), 0),
      capacity: barre.reduce((sum, s) => sum + (s.capacity || 0), 0),
      avgFillRate: 0
    };

    powerCycleMetrics.avgFillRate = powerCycleMetrics.capacity > 0 ? 
      (powerCycleMetrics.attendance / powerCycleMetrics.capacity) * 100 : 0;
    
    barreMetrics.avgFillRate = barreMetrics.capacity > 0 ? 
      (barreMetrics.attendance / barreMetrics.capacity) * 100 : 0;

    return [powerCycleMetrics, barreMetrics];
  }, [filteredData.sessions]);

  // Column definitions
  const productColumns = [
    { key: 'product', header: 'Product', align: 'left' as const },
    { key: 'revenue', header: 'Revenue', align: 'right' as const, render: (value: number) => formatCurrency(value) },
    { key: 'transactions', header: 'Sales', align: 'center' as const },
    { key: 'customers', header: 'Customers', align: 'center' as const },
    { key: 'avgPrice', header: 'Avg Price', align: 'right' as const, render: (value: number) => formatCurrency(value) }
  ];

  const categoryColumns = [
    { key: 'category', header: 'Category', align: 'left' as const },
    { key: 'revenue', header: 'Revenue', align: 'right' as const, render: (value: number) => formatCurrency(value) },
    { key: 'transactions', header: 'Transactions', align: 'center' as const },
    { key: 'products', header: 'Products', align: 'center' as const },
    { key: 'avgTransaction', header: 'Avg Sale', align: 'right' as const, render: (value: number) => formatCurrency(value) }
  ];

  const leadsColumns = [
    { key: 'source', header: 'Source', align: 'left' as const },
    { key: 'totalLeads', header: 'Total Leads', align: 'center' as const },
    { key: 'conversions', header: 'Conversions', align: 'center' as const },
    { key: 'conversionRate', header: 'Rate %', align: 'center' as const, render: (value: number) => `${value.toFixed(1)}%` },
    { key: 'avgLTV', header: 'Avg LTV', align: 'right' as const, render: (value: number) => formatCurrency(value) }
  ];

  const clientClassColumns = [
    { key: 'className', header: 'Class Type', align: 'left' as const },
    { key: 'totalClients', header: 'New Clients', align: 'center' as const },
    { key: 'conversions', header: 'Conversions', align: 'center' as const },
    { key: 'conversionRate', header: 'Conv %', align: 'center' as const, render: (value: number) => `${value.toFixed(1)}%` },
    { key: 'retentionRate', header: 'Retention %', align: 'center' as const, render: (value: number) => `${value.toFixed(1)}%` },
    { key: 'avgLTV', header: 'Avg LTV', align: 'right' as const, render: (value: number) => formatCurrency(value) }
  ];

  const classPerformanceColumns = [
    { key: 'className', header: 'Class Type', align: 'left' as const },
    { key: 'totalSessions', header: 'Sessions', align: 'center' as const },
    { key: 'totalAttendance', header: 'Attendance', align: 'center' as const },
    { key: 'avgFillRate', header: 'Fill Rate %', align: 'center' as const, render: (value: number) => `${Math.round(value)}%` },
    { key: 'avgSessionSize', header: 'Avg Size', align: 'center' as const, render: (value: number) => value.toFixed(1) },
    { key: 'emptySessionRate', header: 'Empty %', align: 'center' as const, render: (value: number) => `${value.toFixed(1)}%` }
  ];

  const trainerColumns = [
    { key: 'teacherName', header: 'Trainer', align: 'left' as const },
    { key: 'totalSessions', header: 'Sessions', align: 'center' as const },
    { key: 'totalCustomers', header: 'Customers', align: 'center' as const },
    { key: 'totalPaid', header: 'Revenue', align: 'right' as const, render: (value: number) => formatCurrency(value) },
    { key: 'classAverageExclEmpty', header: 'Avg Class', align: 'center' as const, render: (value: number) => value?.toFixed(1) }
  ];

  const formatComparisonColumns = [
    { key: 'type', header: 'Format', align: 'left' as const },
    { key: 'sessions', header: 'Sessions', align: 'center' as const },
    { key: 'attendance', header: 'Attendance', align: 'center' as const },
    { key: 'capacity', header: 'Capacity', align: 'center' as const },
    { key: 'avgFillRate', header: 'Fill Rate %', align: 'center' as const, render: (value: number) => `${Math.round(value)}%` }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales by Product */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Sales by Product
            <Badge className="bg-white/20 text-white">{salesByProduct.length} products</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={salesByProduct}
            columns={productColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* Sales by Category */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Sales by Category
            <Badge className="bg-white/20 text-white">{salesByCategory.length} categories</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={salesByCategory}
            columns={categoryColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Performing Products
            <Badge className="bg-white/20 text-white">Top 5</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={topProducts}
            columns={productColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* Bottom Products */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Low Performing Products
            <Badge className="bg-white/20 text-white">Bottom 5</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={bottomProducts}
            columns={productColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* Leads by Source */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Leads by Source & Conversion
            <Badge className="bg-white/20 text-white">{leadsBySource.length} sources</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={leadsBySource}
            columns={leadsColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* New Clients by Class */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            New Clients by Class
            <Badge className="bg-white/20 text-white">{newClientsByClass.length} classes</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={newClientsByClass}
            columns={clientClassColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* Class Performance */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Class Performance Analysis
            <Badge className="bg-white/20 text-white">{classPerformance.length} classes</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={classPerformance}
            columns={classPerformanceColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* Top Trainers */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Top Performing Trainers
            <Badge className="bg-white/20 text-white">Top 5</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={topTrainers}
            columns={trainerColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* Bottom Trainers */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-slate-600 to-gray-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Low Performing Trainers
            <Badge className="bg-white/20 text-white">Bottom 5</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={bottomTrainers}
            columns={trainerColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>

      {/* PowerCycle vs Barre */}
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            PowerCycle vs Barre Comparison
            <Badge className="bg-white/20 text-white">Format Analysis</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ModernDataTable
            data={powerCycleVsBarre}
            columns={formatComparisonColumns}
            maxHeight="400px"
            stickyHeader={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};
