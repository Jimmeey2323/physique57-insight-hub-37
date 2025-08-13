
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { useGlobalFilters } from '@/contexts/GlobalFiltersContext';

interface ExecutiveLocationSelectorProps {
  locations: string[];
}

export const ExecutiveLocationSelector: React.FC<ExecutiveLocationSelectorProps> = ({ locations }) => {
  const { filters, updateFilters } = useGlobalFilters();

  const selectedLocation = Array.isArray(filters.location) ? filters.location[0] : filters.location;

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <label className="text-sm font-medium text-gray-700">Filter by Location:</label>
          <Select
            value={selectedLocation || 'all'}
            onValueChange={(value) => 
              updateFilters({ location: value === 'all' ? [] : [value] })
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select location..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
