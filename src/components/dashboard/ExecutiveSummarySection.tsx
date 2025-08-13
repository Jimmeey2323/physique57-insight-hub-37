
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  BarChart3, 
  Calendar, 
  Eye,
  Activity,
  UserCheck,
  Zap
} from 'lucide-react';
import { ComprehensiveExecutiveDashboard } from './ComprehensiveExecutiveDashboard';
import { SourceDataModal } from '@/components/ui/SourceDataModal';

export const ExecutiveSummarySection = () => {
  const [showSourceData, setShowSourceData] = useState(false);

  return <ComprehensiveExecutiveDashboard />;
};
