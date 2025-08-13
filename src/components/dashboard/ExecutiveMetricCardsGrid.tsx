
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Users, 
  Target, 
  Activity,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  UserCheck,
  Percent,
  Clock,
  Star,
  Zap
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { motion } from 'framer-motion';

export const ExecutiveMetricCardsGrid = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$2,847,235',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      description: 'Previous month revenue'
    },
    {
      title: 'Active Members',
      value: '4,892',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      description: 'Total active memberships'
    },
    {
      title: 'Lead Conversion',
      value: '23.5%',
      change: '+3.1%',
      changeType: 'positive',
      icon: Target,
      color: 'from-purple-500 to-violet-600',
      description: 'Lead to member conversion'
    },
    {
      title: 'Session Attendance',
      value: '1,234',
      change: '+15.3%',
      changeType: 'positive',
      icon: Activity,
      color: 'from-orange-500 to-red-600',
      description: 'Total sessions attended'
    },
    {
      title: 'New Clients',
      value: '456',
      change: '+7.8%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'from-teal-500 to-cyan-600',
      description: 'New member acquisitions'
    },
    {
      title: 'Avg. Transaction',
      value: '$157.50',
      change: '+4.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-indigo-500 to-blue-600',
      description: 'Average transaction value'
    },
    {
      title: 'Retention Rate',
      value: '87.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Percent,
      color: 'from-emerald-500 to-green-600',
      description: 'Member retention rate'
    },
    {
      title: 'Class Utilization',
      value: '78.6%',
      change: '-1.2%',
      changeType: 'negative',
      icon: Clock,
      color: 'from-yellow-500 to-orange-600',
      description: 'Average class capacity filled'
    },
    {
      title: 'Top Trainer Revenue',
      value: '$45,230',
      change: '+18.7%',
      changeType: 'positive',
      icon: Star,
      color: 'from-pink-500 to-rose-600',
      description: 'Highest earning trainer'
    },
    {
      title: 'PowerCycle Classes',
      value: '342',
      change: '+9.4%',
      changeType: 'positive',
      icon: Zap,
      color: 'from-violet-500 to-purple-600',
      description: 'PowerCycle sessions held'
    },
    {
      title: 'Trial Completion',
      value: '68.5%',
      change: '+5.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-600',
      description: 'Trial to membership rate'
    },
    {
      title: 'Avg. LTV',
      value: '$892.40',
      change: '+11.2%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-lime-500 to-green-600',
      description: 'Lifetime value per customer'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Key Performance Metrics</h2>
        <p className="text-slate-600">Real-time insights across all business areas - Previous Month</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={`${
                    metric.changeType === 'positive' 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  } transition-colors font-semibold`}>
                    {metric.changeType === 'positive' ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-2">{metric.title}</h3>
                <p className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</p>
                <p className="text-xs text-slate-500">{metric.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
