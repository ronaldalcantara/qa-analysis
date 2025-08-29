import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Zap,
  Code,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Upload,
  Download,
  Play,
  BarChart3,
  Settings
} from 'lucide-react';
import { TestUpload } from '@/components/testing/TestUpload';
import { UnitTestsModule } from '@/components/testing/UnitTestsModule';
import { SecurityTestsModule } from '@/components/testing/SecurityTestsModule';
import { StressTestsModule } from '@/components/testing/StressTestsModule';
import { CodeQualityModule } from '@/components/testing/CodeQualityModule';
import { RequirementsModule } from '@/components/testing/RequirementsModule';
import { DocumentationModule } from '@/components/testing/DocumentationModule';
import { ReportsModule } from '@/components/testing/ReportsModule';

interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  pending: number;
  coverage: number;
}

export default function TestingDashboard() {
  const [currentProject, setCurrentProject] = useState<string>('');
  const [testSummary] = useState<TestSummary>({
    total: 247,
    passed: 198,
    failed: 15,
    pending: 34,
    coverage: 85
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'hsl(var(--test-passed))';
      case 'failed': return 'hsl(var(--test-failed))';
      case 'pending': return 'hsl(var(--test-pending))';
      case 'running': return 'hsl(var(--test-running))';
      default: return 'hsl(var(--muted))';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Test Analysis Platform</h1>
              <p className="text-muted-foreground">Pirâmide completa de testes para aplicações Java, C#, Go e Rust, dentre outras linguagens.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button variant="default" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Relatório Completo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Testes</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testSummary.total}</div>
              <p className="text-xs text-muted-foreground">
                +12% desde última análise
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
              <CheckCircle className="h-4 w-4" style={{ color: getStatusColor('passed') }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((testSummary.passed / testSummary.total) * 100)}%</div>
              <Progress value={(testSummary.passed / testSummary.total) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cobertura de Código</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testSummary.coverage}%</div>
              <Progress value={testSummary.coverage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Geral</CardTitle>
              <CheckCircle className="h-4 w-4" style={{ color: getStatusColor('passed') }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Estável</div>
              <p className="text-xs text-muted-foreground">
                Todos os critérios atendidos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Test Status Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Resumo dos Testes
            </CardTitle>
            <CardDescription>
              Visão geral do status atual de todos os tipos de teste
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" style={{ color: getStatusColor('passed') }} />
                  <span className="font-medium">Aprovados</span>
                </div>
                <Badge variant="secondary">{testSummary.passed}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5" style={{ color: getStatusColor('failed') }} />
                  <span className="font-medium">Falharam</span>
                </div>
                <Badge variant="destructive">{testSummary.failed}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" style={{ color: getStatusColor('pending') }} />
                  <span className="font-medium">Pendentes</span>
                </div>
                <Badge variant="outline">{testSummary.pending}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5" style={{ color: getStatusColor('running') }} />
                  <span className="font-medium">Executando</span>
                </div>
                <Badge variant="outline">0</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Testing Modules */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="unit" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Unitários
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="stress" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Stress
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Qualidade
            </TabsTrigger>
            <TabsTrigger value="requirements" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Requisitos
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Docs
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Relatórios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <TestUpload onProjectChange={setCurrentProject} />
          </TabsContent>

          <TabsContent value="unit">
            <UnitTestsModule />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTestsModule />
          </TabsContent>

          <TabsContent value="stress">
            <StressTestsModule />
          </TabsContent>

          <TabsContent value="quality">
            <CodeQualityModule />
          </TabsContent>

          <TabsContent value="requirements">
            <RequirementsModule />
          </TabsContent>

          <TabsContent value="docs">
            <DocumentationModule />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsModule />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
