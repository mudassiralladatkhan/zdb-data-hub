
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const ExportPage = () => {
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [exportFormat, setExportFormat] = useState('');

  const databases = {
    sql: ['users', 'orders', 'products'],
    nosql: ['users', 'products', 'logs']
  };

  const handleExport = async () => {
    if (!selectedDatabase || !selectedTable) {
      toast({
        title: "Missing selection",
        description: "Please select both database type and table/collection.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const format = selectedDatabase === 'sql' ? 'CSV' : 'JSON';
      const filename = `${selectedTable}.${format.toLowerCase()}`;
      
      toast({
        title: "Export completed! 📂",
        description: `Data exported as ${filename}`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const getAvailableTables = () => {
    if (selectedDatabase === 'sql') {
      setExportFormat('CSV');
      return databases.sql;
    } else if (selectedDatabase === 'nosql') {
      setExportFormat('JSON');
      return databases.nosql;
    }
    return [];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Export Data</h1>
        <p className="text-muted-foreground">
          Export your database tables and collections
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
            <CardDescription>
              Select the data you want to export
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Database Type</Label>
              <Select 
                value={selectedDatabase} 
                onValueChange={(value) => {
                  setSelectedDatabase(value);
                  setSelectedTable('');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose database type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sql">SQL Database</SelectItem>
                  <SelectItem value="nosql">NoSQL Database</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedDatabase && (
              <div className="space-y-2">
                <Label>
                  {selectedDatabase === 'sql' ? 'Table' : 'Collection'}
                </Label>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Choose a ${selectedDatabase === 'sql' ? 'table' : 'collection'}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableTables().map(item => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {exportFormat && (
              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{exportFormat}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {exportFormat === 'CSV' ? 'Comma-separated values' : 'JavaScript Object Notation'}
                  </span>
                </div>
              </div>
            )}

            <Button 
              onClick={handleExport} 
              disabled={!selectedDatabase || !selectedTable}
              className="w-full"
            >
              Export Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export History</CardTitle>
            <CardDescription>
              Recent export operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { file: 'users.csv', type: 'SQL', date: '2 hours ago', size: '2.4 MB' },
                { file: 'products.json', type: 'NoSQL', date: '1 day ago', size: '1.8 MB' },
                { file: 'orders.csv', type: 'SQL', date: '3 days ago', size: '5.2 MB' },
              ].map((export_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{export_.file}</div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {export_.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {export_.size}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {export_.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportPage;
