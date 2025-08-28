import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, Play, Code, FileText, BarChart3, AlertTriangle } from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  className: string;
  status: 'passed' | 'failed' | 'pending' | 'skipped';
  duration: number;
  errorMessage?: string;
  coverage: number;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  coverage: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
}

export function UnitTestsModule() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [testSuites] = useState<TestSuite[]>([
    {
      name: 'UserService Tests',
      coverage: 87,
      totalTests: 25,
      passedTests: 22,
      failedTests: 3,
      tests: [
        {
          id: '1',
          name: 'shouldCreateUser',
          className: 'UserServiceTest',
          status: 'passed',
          duration: 45,
          coverage: 92
        },
        {
          id: '2',
          name: 'shouldValidateUserEmail',
          className: 'UserServiceTest',
          status: 'failed',
          duration: 23,
          coverage: 78,
          errorMessage: 'Expected email validation to fail for invalid format'
        },
        {
          id: '3',
          name: 'shouldUpdateUserProfile',
          className: 'UserServiceTest',
          status: 'passed',
          duration: 67,
          coverage: 85
        }
      ]
    },
    {
      name: 'OrderService Tests',
      coverage: 92,
      totalTests: 18,
      passedTests: 17,
      failedTests: 1,
      tests: [
        {
          id: '4',
          name: 'shouldProcessOrder',
          className: 'OrderServiceTest',
          status: 'passed',
          duration: 89,
          coverage: 95
        },
        {
          id: '5',
          name: 'shouldCalculateTotal',
          className: 'OrderServiceTest',
          status: 'passed',
          duration: 34,
          coverage: 88
        }
      ]
    }
  ]);

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800">Passou</Badge>;
      case 'failed':
        return <Badge variant="destructive">Falhou</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>;
      default:
        return <Badge variant="outline">Aguardando</Badge>;
    }
  };

  const overallCoverage = Math.round(
    testSuites.reduce((acc, suite) => acc + suite.coverage, 0) / testSuites.length
  );

  const totalTests = testSuites.reduce((acc, suite) => acc + suite.totalTests, 0);
  const totalPassed = testSuites.reduce((acc, suite) => acc + suite.passedTests, 0);
  const totalFailed = testSuites.reduce((acc, suite) => acc + suite.failedTests, 0);

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Testes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTests}</div>
            <p className="text-xs text-muted-foreground">
              {testSuites.length} suítes de teste
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((totalPassed / totalTests) * 100)}%
            </div>
            <Progress value={(totalPassed / totalTests) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cobertura de Código</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallCoverage}%</div>
            <Progress value={overallCoverage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52ms</div>
            <p className="text-xs text-muted-foreground">
              Por teste unitário
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Test Execution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Execução de Testes
          </CardTitle>
          <CardDescription>
            Execute todos os testes unitários ou suítes específicas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={runTests} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Executando...' : 'Executar Todos os Testes'}
            </Button>
            <Button variant="outline">
              <Code className="h-4 w-4 mr-2" />
              Gerar Novos Testes
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Relatório Detalhado
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Executando testes...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      <Tabs defaultValue="suites" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suites">Suítes de Teste</TabsTrigger>
          <TabsTrigger value="coverage">Cobertura</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="suites" className="space-y-4">
          {testSuites.map((suite, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    {suite.name}
                  </span>
                  <div className="flex gap-2">
                    <Badge variant="outline">{suite.totalTests} testes</Badge>
                    <Badge className="bg-green-100 text-green-800">{suite.passedTests} passou</Badge>
                    {suite.failedTests > 0 && (
                      <Badge variant="destructive">{suite.failedTests} falhou</Badge>
                    )}
                  </div>
                </CardTitle>
                <CardDescription>
                  Cobertura: {suite.coverage}% • Taxa de sucesso: {Math.round((suite.passedTests / suite.totalTests) * 100)}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suite.tests.map(test => (
                    <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(test.status)}
                        <div>
                          <p className="font-medium">{test.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {test.className} • {test.duration}ms • Cobertura: {test.coverage}%
                          </p>
                          {test.errorMessage && (
                            <p className="text-sm text-red-600 mt-1">{test.errorMessage}</p>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(test.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Análise de Cobertura
              </CardTitle>
              <CardDescription>
                Detalhamento da cobertura de código por módulo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testSuites.map((suite, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{suite.name}</span>
                      <span className="text-sm text-muted-foreground">{suite.coverage}%</span>
                    </div>
                    <Progress value={suite.coverage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recomendações de Melhoria
              </CardTitle>
              <CardDescription>
                Sugestões para melhorar a qualidade dos testes unitários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                  <h4 className="font-medium">Cobertura Insuficiente</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    O módulo UserService tem cobertura de 87%. Adicione testes para métodos críticos como validação de senha.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                  <h4 className="font-medium">Testes Lentos</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Alguns testes estão demorando mais de 100ms. Considere usar mocks para dependências externas.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                  <h4 className="font-medium">Boas Práticas</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Implemente testes de integração para validar a comunicação entre UserService e OrderService.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}