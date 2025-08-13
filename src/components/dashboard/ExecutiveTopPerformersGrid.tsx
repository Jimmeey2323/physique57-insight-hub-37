
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  DollarSign,
  Star,
  Award,
  Crown,
  Medal
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/formatters';

export const ExecutiveTopPerformersGrid = () => {
  const topSellers = [
    { name: 'Sarah Johnson', revenue: 45230, transactions: 67, avgValue: 675, rank: 1 },
    { name: 'Mike Rodriguez', revenue: 42150, transactions: 59, avgValue: 714, rank: 2 },
    { name: 'Lisa Chen', revenue: 38970, transactions: 62, avgValue: 628, rank: 3 },
    { name: 'David Kim', revenue: 36540, transactions: 58, avgValue: 630, rank: 4 },
    { name: 'Emma Wilson', revenue: 34120, transactions: 55, avgValue: 620, rank: 5 }
  ];

  const topTrainers = [
    { name: 'Sarah Martinez', sessions: 78, customers: 245, revenue: 18750, retention: 87.2, rank: 1 },
    { name: 'Mike Thompson', sessions: 72, customers: 228, revenue: 17340, retention: 84.1, rank: 2 },
    { name: 'Lisa Anderson', sessions: 69, customers: 215, revenue: 16890, retention: 82.8, rank: 3 },
    { name: 'John Parker', sessions: 65, customers: 198, revenue: 15670, retention: 79.4, rank: 4 },
    { name: 'Emma Davis', sessions: 61, customers: 189, revenue: 14520, retention: 81.2, rank: 5 }
  ];

  const topLocations = [
    { name: 'Downtown', revenue: 125430, members: 456, sessions: 234, conversion: 28.4, rank: 1 },
    { name: 'Uptown', revenue: 98750, members: 378, sessions: 198, conversion: 25.7, rank: 2 },
    { name: 'Midtown', revenue: 87690, members: 334, sessions: 176, conversion: 23.1, rank: 3 },
    { name: 'Westside', revenue: 76540, members: 298, sessions: 154, conversion: 21.8, rank: 4 },
    { name: 'Eastside', revenue: 65420, members: 267, sessions: 132, conversion: 20.3, rank: 5 }
  ];

  const leadSources = [
    { name: 'Referrals', leads: 189, conversions: 67, conversionRate: 35.4, avgLTV: 1245, rank: 1 },
    { name: 'Walk-ins', leads: 98, conversions: 31, conversionRate: 31.6, avgLTV: 956, rank: 2 },
    { name: 'Website', leads: 234, conversions: 56, conversionRate: 23.9, avgLTV: 892, rank: 3 },
    { name: 'Google Ads', leads: 134, conversions: 28, conversionRate: 20.9, avgLTV: 734, rank: 4 },
    { name: 'Social Media', leads: 156, conversions: 32, conversionRate: 20.5, avgLTV: 678, rank: 5 }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <Trophy className="w-4 h-4 text-slate-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-400 to-amber-600';
      default: return 'from-slate-300 to-slate-500';
    }
  };

  const renderPerformerCard = (item: any, index: number, type: string) => (
    <div 
      key={item.name}
      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 hover:border-blue-200 cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 bg-gradient-to-r ${getRankColor(item.rank)} rounded-full flex items-center justify-center shadow-lg`}>
          {getRankIcon(item.rank)}
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
          <p className="text-xs text-slate-500">
            {type === 'seller' && `${item.transactions} transactions`}
            {type === 'trainer' && `${item.sessions} sessions`}
            {type === 'location' && `${item.members} members`}
            {type === 'source' && `${item.leads} leads`}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-slate-800 text-sm">
          {formatCurrency(item.revenue || item.avgLTV)}
        </p>
        <p className="text-xs text-slate-500">
          {type === 'seller' && `${formatCurrency(item.avgValue)} avg`}
          {type === 'trainer' && `${item.retention}% retention`}
          {type === 'location' && `${item.conversion}% conv`}
          {type === 'source' && `${item.conversionRate}% conv`}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Top Performers & Rankings</h2>
        <p className="text-slate-600">Leading performers across all business areas - Previous Month</p>
        <Badge className="bg-yellow-100 text-yellow-800 mt-2">
          <Trophy className="w-3 h-3 mr-1" />
          Top 5 in Each Category
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {/* Top Sales People */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-xl">
          <CardHeader className="border-b border-green-200 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="w-5 h-5" />
              Top Sales People
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {topSellers.map((seller, index) => renderPerformerCard(seller, index, 'seller'))}
            
            <Button variant="outline" className="w-full mt-4 text-green-700 border-green-300 hover:bg-green-50">
              View All Sellers
            </Button>
          </CardContent>
        </Card>

        {/* Top Trainers */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 shadow-xl">
          <CardHeader className="border-b border-blue-200 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5" />
              Top Trainers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {topTrainers.map((trainer, index) => renderPerformerCard(trainer, index, 'trainer'))}
            
            <Button variant="outline" className="w-full mt-4 text-blue-700 border-blue-300 hover:bg-blue-50">
              View All Trainers
            </Button>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 shadow-xl">
          <CardHeader className="border-b border-purple-200 bg-gradient-to-r from-purple-600 to-violet-600 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5" />
              Top Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {topLocations.map((location, index) => renderPerformerCard(location, index, 'location'))}
            
            <Button variant="outline" className="w-full mt-4 text-purple-700 border-purple-300 hover:bg-purple-50">
              View All Locations
            </Button>
          </CardContent>
        </Card>

        {/* Top Lead Sources */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200 shadow-xl">
          <CardHeader className="border-b border-orange-200 bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5" />
              Top Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {leadSources.map((source, index) => renderPerformerCard(source, index, 'source'))}
            
            <Button variant="outline" className="w-full mt-4 text-orange-700 border-orange-300 hover:bg-orange-50">
              View All Sources
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200">
          <CardContent className="p-6 text-center">
            <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="font-bold text-yellow-800 text-lg mb-2">Champion Performer</h3>
            <p className="text-yellow-700 font-semibold">Sarah Johnson</p>
            <p className="text-yellow-600 text-sm">Highest revenue: {formatCurrency(45230)}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold text-green-800 text-lg mb-2">Growth Leader</h3>
            <p className="text-green-700 font-semibold">Downtown Location</p>
            <p className="text-green-600 text-sm">28.4% conversion rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-blue-800 text-lg mb-2">Quality Leader</h3>
            <p className="text-blue-700 font-semibold">Sarah Martinez</p>
            <p className="text-blue-600 text-sm">87.2% retention rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
