
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '../../contexts/AuthContext';

const NoSQLManager = () => {
  const { hasRole } = useAuth();
  const [collections, setCollections] = useState(['users', 'products', 'logs']);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [jsonData, setJsonData] = useState('{\n  "key": "value"\n}');
  const [queryResults, setQueryResults] = useState<any[]>([]);

  const createCollection = async () => {
    if (!newCollectionName) {
      toast({
        title: "Collection name required",
        description: "Please provide a collection name.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCollections([...collections, newCollectionName]);
      setNewCollectionName('');
      
      toast({
        title: "Collection created successfully! 🎉",
        description: `Collection "${newCollectionName}" has been created.`,
      });
    } catch (error) {
      toast({
        title: "Error creating collection",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const insertDocument = async () => {
    if (!selectedCollection || !jsonData) {
      toast({
        title: "Missing information",
        description: "Please select a collection and provide JSON data.",
        variant: "destructive",
      });
      return;
    }

    try {
      JSON.parse(jsonData); // Validate JSON
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Document inserted successfully! 🎉",
        description: `Document added to "${selectedCollection}".`,
      });
    } catch (error) {
      toast({
        title: "Invalid JSON or insert failed",
        description: "Please check your JSON format and try again.",
        variant: "destructive",
      });
    }
  };

  const queryDocuments = async () => {
    if (!selectedCollection) {
      toast({
        title: "No collection selected",
        description: "Please select a collection to query.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock query results
      const mockResults = [
        { _id: '1', name: 'Product A', price: 29.99, category: 'electronics' },
        { _id: '2', name: 'Product B', price: 49.99, category: 'books' },
        { _id: '3', name: 'Product C', price: 19.99, category: 'clothing' },
      ];
      
      setQueryResults(mockResults);
      toast({
        title: "Query executed successfully",
        description: `Found ${mockResults.length} documents.`,
      });
    } catch (error) {
      toast({
        title: "Query failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportData = async () => {
    if (!selectedCollection) {
      toast({
        title: "No collection selected",
        description: "Please select a collection to export.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Mock export
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Export successful! 📂",
        description: `Data from "${selectedCollection}" has been exported.`,
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
        <h1 className="text-3xl font-bold">NoSQL Manager</h1>
        <p className="text-muted-foreground">
          Manage your NoSQL collections and documents
        </p>
      </div>

      <Tabs defaultValue="query" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="query">Query Documents</TabsTrigger>
          {canModify && <TabsTrigger value="create">Create Collection</TabsTrigger>}
          {canModify && <TabsTrigger value="insert">Insert Document</TabsTrigger>}
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="query">
          <Card>
            <CardHeader>
              <CardTitle>Query Documents</CardTitle>
              <CardDescription>
                Select a collection and execute queries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Collection</Label>
                <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map(collection => (
                      <SelectItem key={collection} value={collection}>{collection}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={queryDocuments} disabled={!selectedCollection}>
                Execute Query
              </Button>

              {queryResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Query Results</h3>
                  <div className="space-y-4">
                    {queryResults.map((doc, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <pre className="text-sm bg-muted p-3 rounded overflow-auto">
                            {JSON.stringify(doc, null, 2)}
                          </pre>
                        </CardContent>
                      </Card>
                    ))}
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
                <CardTitle>Create Collection</CardTitle>
                <CardDescription>
                  Create a new NoSQL collection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Collection Name</Label>
                  <Input
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Enter collection name"
                  />
                </div>

                <Button onClick={createCollection}>
                  Create Collection
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {canModify && (
          <TabsContent value="insert">
            <Card>
              <CardHeader>
                <CardTitle>Insert Document</CardTitle>
                <CardDescription>
                  Add new documents to your collections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Collection</Label>
                  <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map(collection => (
                        <SelectItem key={collection} value={collection}>{collection}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Document Data (JSON)</Label>
                  <Textarea
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                    placeholder="Enter JSON document"
                    className="font-mono text-sm"
                    rows={8}
                  />
                </div>

                <Button onClick={insertDocument} disabled={!selectedCollection}>
                  Insert Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>
                Export collection data as JSON files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Collection</Label>
                <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a collection to export" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map(collection => (
                      <SelectItem key={collection} value={collection}>{collection}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline">Format: JSON</Badge>
                {selectedCollection && (
                  <Badge variant="secondary">{selectedCollection}.json</Badge>
                )}
              </div>

              <Button onClick={exportData} disabled={!selectedCollection}>
                Export Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NoSQLManager;
