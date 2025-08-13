
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PowerCycleVsBarreCharts } from './PowerCycleVsBarreCharts';
import { PowerCycleVsBarreTopBottomLists } from './PowerCycleVsBarreTopBottomLists';
import { PowerCycleVsBarreAdvancedMetrics } from './PowerCycleVsBarreAdvancedMetrics';
import { PowerCycleVsBarreMetricCards } from './PowerCycleVsBarreMetricCards';
import { PowerCycleVsBarreEnhancedFilterSection } from './PowerCycleVsBarreEnhancedFilterSection';
import { PowerCycleVsBarreComparison } from './PowerCycleVsBarreComparison';
import { PowerCycleVsBarrePayrollMetrics } from './PowerCycleVsBarrePayrollMetrics';
import { PowerCycleVsBarreEnhancedMonthOnMonthTable } from './PowerCycleVsBarreEnhancedMonthOnMonthTable';
import { PowerCycleVsBarreTables } from './PowerCycleVsBarreTables';
import { SourceDataModal } from '@/components/ui/SourceDataModal';
import { TrainerDrillDownModal } from './TrainerDrillDownModal';
import { Eye, BarChart3, Users, Target, TrendingUp, DollarSign, Calendar, Zap } from 'lucide-react';
import { SessionData as SessionsDataType } from '@/hooks/useSessionsData';
import { SessionData as DashboardSessionData } from '@/types/dashboard';
import { useSessionsFilters } from '@/contexts/SessionsFiltersContext';

interface PowerCycleVsBarreSectionProps {
  data: SessionsDataType[];
  loading?: boolean;
  onItemClick?: (item: any) => void;
}

export const PowerCycleVsBarreSection: React.FC<PowerCycleVsBarreSectionProps> = ({
  data,
  loading = false,
  onItemClick
}) => {
  const [showSourceData, setShowSourceData] = useState(false);
  const [drillDownData, setDrillDownData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { filters } = useSessionsFilters();

  // Transform SessionsData to DashboardSessionData format
  const transformedData: DashboardSessionData[] = useMemo(() => {
    return data.map(session => ({
      sessionId: session.sessionId,
      date: session.date,
      time: session.time,
      classType: session.classType,
      cleanedClass: session.cleanedClass,
      instructor: session.trainerName || 'Unknown',
      location: session.location,
      capacity: session.capacity,
      booked: session.bookedCount,
      checkedIn: session.checkedInCount,
      checkedInCount: session.checkedInCount,
      waitlisted: 0,
      waitlist: 0,
      noShows: Math.max(0, session.bookedCount - session.checkedInCount),
      fillPercentage: session.fillPercentage || 0,
      sessionCount: 1,
      totalAttendees: session.checkedInCount
    }));
  }, [data]);

  // Apply filters to the original sessions data
  const filteredData = useMemo(() => {
    return data.filter(session => {
      // Apply trainer filter
      if (filters.trainers.length > 0 && !filters.trainers.includes(session.trainerName)) {
        return false;
      }
      
      // Apply class type filter
      if (filters.classTypes.length > 0 && !filters.classTypes.includes(session.cleanedClass)) {
        return false;
      }
      
      // Apply time slot filter
      if (filters.timeSlots.length > 0 && !filters.timeSlots.includes(session.time)) {
        return false;
      }
      
      // Apply date range filter
      if (filters.dateRange.start) {
        const sessionDate = new Date(session.date);
        const startDate = new Date(filters.dateRange.start);
        if (sessionDate < startDate) {
          return false;
        }
      }
      
      if (filters.dateRange.end) {
        const sessionDate = new Date(session.date);
        const endDate = new Date(filters.dateRange.end);
        if (sessionDate > endDate) {
          return false;
        }
      }
      
      return true;
    });
  }, [data, filters]);

  // Separate PowerCycle and Barre data using filtered hook data
  const powerCycleData = useMemo(() => {
    return filteredData.filter(session => 
      session.cleanedClass?.toLowerCase().includes('cycle') || 
      session.classType?.toLowerCase().includes('cycle')
    );
  }, [filteredData]);

  const barreData = useMemo(() => {
    return filteredData.filter(session => 
      session.cleanedClass?.toLowerCase().includes('barre') || 
      session.classType?.toLowerCase().includes('barre')
    );
  }, [filteredData]);

  // Calculate metrics for comparison using hook data
  const powerCycleMetrics = useMemo(() => {
    const totalSessions = powerCycleData.length;
    const totalAttendance = powerCycleData.reduce((sum, s) => sum + s.checkedInCount, 0);
    const totalCapacity = powerCycleData.reduce((sum, s) => sum + s.capacity, 0);
    const totalBookings = powerCycleData.reduce((sum, s) => sum + s.bookedCount, 0);
    const emptySessions = powerCycleData.filter(s => s.checkedInCount === 0).length;
    const avgFillRate = totalCapacity > 0 ? (totalAttendance / totalCapacity) * 100 : 0;
    const avgSessionSize = totalSessions > 0 ? totalAttendance / totalSessions : 0;
    const avgSessionSizeExclEmpty = (totalSessions - emptySessions) > 0 ? totalAttendance / (totalSessions - emptySessions) : 0;
    const noShows = totalBookings - totalAttendance;

    return {
      totalSessions,
      totalAttendance,
      totalCapacity,
      totalBookings,
      emptySessions,
      avgFillRate,
      avgSessionSize,
      avgSessionSizeExclEmpty,
      noShows
    };
  }, [powerCycleData]);

  const barreMetrics = useMemo(() => {
    const totalSessions = barreData.length;
    const totalAttendance = barreData.reduce((sum, s) => sum + s.checkedInCount, 0);
    const totalCapacity = barreData.reduce((sum, s) => sum + s.capacity, 0);
    const totalBookings = barreData.reduce((sum, s) => sum + s.bookedCount, 0);
    const emptySessions = barreData.filter(s => s.checkedInCount === 0).length;
    const avgFillRate = totalCapacity > 0 ? (totalAttendance / totalCapacity) * 100 : 0;
    const avgSessionSize = totalSessions > 0 ? totalAttendance / totalSessions : 0;
    const avgSessionSizeExclEmpty = (totalSessions - emptySessions) > 0 ? totalAttendance / (totalSessions - emptySessions) : 0;
    const noShows = totalBookings - totalAttendance;

    return {
      totalSessions,
      totalAttendance,
      totalCapacity,
      totalBookings,
      emptySessions,
      avgFillRate,
      avgSessionSize,
      avgSessionSizeExclEmpty,
      noShows
    };
  }, [barreData]);

  const handleItemClick = (item: any) => {
    console.log('Item clicked:', item);
    setDrillDownData(item);
    onItemClick?.(item);
  };

  const handleMetricCardClick = (metricType: string, data: any) => {
    setDrillDownData({
      type: 'metric',
      metricType,
      data,
      powerCycleMetrics,
      barreMetrics
    });
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Filter Section */}
      <PowerCycleVsBarreEnhancedFilterSection data={data} />

      {/* Metric Cards */}
      <PowerCycleVsBarreMetricCards 
        data={transformedData} 
        onCardClick={handleMetricCardClick}
      />

      {/* Comparison Overview */}
      <PowerCycleVsBarreComparison 
        powerCycleMetrics={powerCycleMetrics}
        barreMetrics={barreMetrics}
        onItemClick={handleItemClick}
      />

      {/* Main Content Tabs - Styled like Sales Tab */}
      <Card className="bg-gradient-to-br from-white via-slate-50/30 to-purple-50/20 shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white border-0">
          <CardTitle className="text-2xl font-bold flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-6 h-6" />
            </div>
            PowerCycle vs Barre Deep Analytics
            <Badge className="bg-white/20 text-white backdrop-blur-sm px-3 py-1">
              {filteredData.length} sessions analyzed
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border-0 grid grid-cols-6 w-full max-w-6xl mx-auto overflow-hidden mb-8">
              <TabsTrigger 
                value="overview" 
                className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Charts & Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <Target className="w-4 h-4 mr-2" />
                Performance Lists
              </TabsTrigger>
              <TabsTrigger 
                value="advanced" 
                className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <Users className="w-4 h-4 mr-2" />
                Advanced Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="monthOnMonth" 
                className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Month-on-Month
              </TabsTrigger>
              <TabsTrigger 
                value="payroll" 
                className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Payroll Metrics
              </TabsTrigger>
              <TabsTrigger 
                value="tables" 
                className="relative rounded-xl px-4 py-3 font-semibold text-xs transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Data Tables
              </TabsTrigger>
            </TabsList>

            <div className="space-y-6">
              <TabsContent value="overview" className="space-y-6 mt-0">
                <PowerCycleVsBarreCharts 
                  powerCycleData={powerCycleData} 
                  barreData={barreData} 
                  onItemClick={handleItemClick}
                />
              </TabsContent>

              <TabsContent value="performance" className="space-y-6 mt-0">
                <PowerCycleVsBarreTopBottomLists 
                  powerCycleData={powerCycleData} 
                  barreData={barreData} 
                  onItemClick={handleItemClick}
                />
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-0">
                <PowerCycleVsBarreAdvancedMetrics 
                  data={filteredData}
                />
              </TabsContent>

              <TabsContent value="monthOnMonth" className="space-y-6 mt-0">
                <PowerCycleVsBarreEnhancedMonthOnMonthTable 
                  onRowClick={handleItemClick}
                />
              </TabsContent>

              <TabsContent value="payroll" className="space-y-6 mt-0">
                <PowerCycleVsBarrePayrollMetrics />
              </TabsContent>

              <TabsContent value="tables" className="space-y-6 mt-0">
                <PowerCycleVsBarreTables 
                  powerCycleData={powerCycleData} 
                  barreData={barreData} 
                  salesData={[]} 
                  payrollData={[]} 
                  onRowClick={handleItemClick}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Source Data Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowSourceData(true)}
          className="gap-2 shadow-lg hover:shadow-xl transition-shadow bg-white"
        >
          <Eye className="w-4 h-4" />
          View Source Data
        </Button>
      </div>

      {/* Modals */}
      {drillDownData && (
        <TrainerDrillDownModal
          isOpen={!!drillDownData}
          onClose={() => setDrillDownData(null)}
          trainerName={drillDownData.trainerName || drillDownData.type || 'Analytics'}
          trainerData={drillDownData}
        />
      )}

      {showSourceData && (
        <SourceDataModal
          open={showSourceData}
          onOpenChange={setShowSourceData}
          sources={[
            {
              name: "PowerCycle vs Barre Performance",
              data: transformedData
            },
            {
              name: "PowerCycle Sessions",
              data: powerCycleData
            },
            {
              name: "Barre Sessions", 
              data: barreData
            }
          ]}
        />
      )}
    </div>
  );
};
