
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '../../contexts/AuthContext';

const SQLManager = () => {
  const { hasRole } = useAuth();
  const [tables, setTables] = useState(['users', 'orders', 'products']);
  const [selectedTable, setSelectedTable] = useState('');
  const [newTableName, setNewTableName] = useState('');
  const [tableFields, setTableFields] = useState([{ name: '', type: 'VARCHAR(255)' }]);
  const [queryResults, setQueryResults] = useState<any[]>([]);

  const dataTypes = [
    'VARCHAR(255)', 'TEXT', 'INTEGER', 'DECIMAL', 'BOOLEAN', 
    'DATE', 'DATETIME', 'TIMESTAMP'
  ];

  const addTableField = () => {
    setTableFields([...tableFields, { name: '', type: 'VARCHAR(255)' }]);
  };

  const removeTableField = (index: number) => {
    setTableFields(tableFields.filter((_, i) => i !== index));
  };

  const updateTableField = (index: number, field: 'name' | 'type', value: string) => {
    const updated = [...tableFields];
    updated[index][field] = value;
    setTableFields(updated);
  };

  const createTable = async () => {
    if (!newTableName || tableFields.some(f => !f.name)) {
      toast({
        title: "Invalid input",
        description: "Please provide table name and all field names.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTables([...tables, newTableName]);
      setNewTableName('');
      setTableFields([{ name: '', type: 'VARCHAR(255)' }]);
      
      toast({
        title: "Table created successfully! 🎉",
        description: `Table "${newTableName}" has been created.`,
      });
    } catch (error) {
      toast({
        title: "Error creating table",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const executeQuery = async () => {
    if (!selectedTable) {
      toast({
        title: "No table selected",
        description: "Please select a table to query.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock query results
      const mockResults = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
      ];
      
      setQueryResults(mockResults);
      toast({
        title: "Query executed successfully",
        description: `Found ${mockResults.length} records.`,
      });
    } catch (error) {
      toast({
        title: "Query failed",
        description: "Please check your query and try again.",
        variant: "destructive",
      });
    }
  };

  const exportData = async () => {
    if (!selectedTable) {
      toast({
        title: "No table selected",
        description: "Please select a table to export.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock export
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Export successful! 📂",
        description: `Data from "${selectedTable}" has been exported.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const canModify = hasRole('Admin') || hasRole('Developer');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">SQL Manager</h1>
        <p className="text-muted-foreground">
          Manage your SQL tables and data
        </p>
      </div>

      <Tabs defaultValue="query" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="query">Query Data</TabsTrigger>
          {canModify && <TabsTrigger value="create">Create Table</TabsTrigger>}
          {canModify && <TabsTrigger value="insert">Insert Data</TabsTrigger>}
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="query">
          <Card>
            <CardHeader>
              <CardTitle>Query Data</CardTitle>
              <CardDescription>
                Select a table and execute queries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Table</Label>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a table" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map(table => (
                      <SelectItem key={table} value={table}>{table}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={executeQuery} disabled={!selectedTable}>
                Execute Query
              </Button>

              {queryResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Query Results</h3>
                  <div className="border rounded-lg overflow-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          {Object.keys(queryResults[0]).map(key => (
                            <th key={key} className="text-left p-3 font-medium">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResults.map((row, index) => (
                          <tr key={index} className="border-b">
                            {Object.values(row).map((value, i) => (
                              <td key={i} className="p-3">
                                {String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {canModify && (
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create Table</CardTitle>
                <CardDescription>
                  Define a new SQL table structure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Table Name</Label>
                  <Input
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    placeholder="Enter table name"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Table Fields</Label>
                  {tableFields.map((field, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        value={field.name}
                        onChange={(e) => updateTableField(index, 'name', e.target.value)}
                        placeholder="Field name"
                        className="flex-1"
                      />
                      <Select
                        value={field.type}
                        onValueChange={(value) => updateTableField(index, 'type', value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {dataTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {tableFields.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTableField(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button variant="outline" onClick={addTableField}>
                    Add Field
                  </Button>
                </div>

                <Button onClick={createTable}>
                  Create Table
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {canModify && (
          <TabsContent value="insert">
            <Card>
              <CardHeader>
                <CardTitle>Insert Data</CardTitle>
                <CardDescription>
                  Add new records to your tables
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Table</Label>
                  <Select value={selectedTable} onValueChange={setSelectedTable}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a table" />
                    </SelectTrigger>
                    <SelectContent>
                      {tables.map(table => (
                        <SelectItem key={table} value={table}>{table}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTable && (
                  <div className="space-y-3">
                    <Label>Record Data</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="Enter name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="Enter email" />
                      </div>
                    </div>
                    
                    <Button>
                      Insert Record
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>
                Export table data as CSV files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Table</Label>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a table to export" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map(table => (
                      <SelectItem key={table} value={table}>{table}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline">Format: CSV</Badge>
                {selectedTable && (
                  <Badge variant="secondary">{selectedTable}.csv</Badge>
                )}
              </div>

              <Button onClick={exportData} disabled={!selectedTable}>
                Export Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SQLManager;
