import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Activity, Clock, Users, TrendingUp, AlertTriangle, Play, Pause, Square } from 'lucide-react';

interface LoadTest {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  users: number;
  duration: number;
  status: 'idle' | 'running' | 'completed' | 'failed';
  results?: {
    averageResponseTime: number;
    maxResponseTime: number;
    minResponseTime: number;
    successRate: number;
    throughput: number;
    errors: number;
  };
}

interface MetricData {
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  threshold: number;
}

export function StressTestsModule() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTest, setSelectedTest] = useState<string>('');

  const [loadTests, setLoadTests] = useState<LoadTest[]>([
    {
      id: 'test-1',
      name: 'API Login Stress Test',
      endpoint: '/api/auth/login',
      method: 'POST',
      users: 1000,
      duration: 300,
      status: 'completed',
      results: {
        averageResponseTime: 245,
        maxResponseTime: 1200,
        minResponseTime: 89,
        successRate: 99.2,
        throughput: 850,
        errors: 8
      }
    },
    {
      id: 'test-2',
      name: 'User Registration Load Test',
      endpoint: '/api/users/register',
      method: 'POST',
      users: 500,
      duration: 180,
      status: 'completed',
      results: {
        averageResponseTime: 380,
        maxResponseTime: 2100,
        minResponseTime: 120,
        successRate: 97.8,
        throughput: 420,
        errors: 11
      }
    },
    {
      id: 'test-3',
      name: 'Product Search Performance',
      endpoint: '/api/products/search',
      method: 'GET',
      users: 2000,
      duration: 600,
      status: 'idle'
    }
  ]);

  const [metrics] = useState<MetricData[]>([
    {
      name: 'Tempo de Resposta Médio',
      value: 245,
      unit: 'ms',
      status: 'good',
      threshold: 500
    },
    {
      name: 'Taxa de Sucesso',
      value: 99.2,
      unit: '%',
      status: 'excellent',
      threshold: 95
    },
    {
      name: 'Throughput',
      value: 850,
      unit: 'req/s',
      status: 'excellent',
      threshold: 500
    },
    {
      name: 'CPU Utilization',
      value: 75,
      unit: '%',
      status: 'warning',
      threshold: 80
    },
    {
      name: 'Memory Usage',
      value: 68,
      unit: '%',
      status: 'good',
      threshold: 85
    },
    {
      name: 'Error Rate',
      value: 0.8,
      unit: '%',
      status: 'excellent',
      threshold: 5
    }
  ]);

  const runStressTest = async (testId?: string) => {
    setIsRunning(true);
    setProgress(0);
    setSelectedTest(testId || '');
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          
          // Update test status
          if (testId) {
            setLoadTests(current => 
              current.map(test => 
                test.id === testId 
                  ? { ...test, status: 'completed' as const }
                  : test
              )
            );
          }
          
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'hsl(var(--performance-excellent))';
      case 'good':
        return 'hsl(var(--performance-good))';
      case 'warning':
        return 'hsl(var(--performance-average))';
      case 'critical':
        return 'hsl(var(--performance-poor))';
      default:
        return 'hsl(var(--muted))';
    }
  };

  const getStatusBadge = (status: string) => {
    const style = { backgroundColor: getStatusColor(status), color: 'white' };
    return (
      <Badge style={style}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getTestStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
      case 'running':
        return <Badge variant="secondary">Executando</Badge>;
      case 'failed':
        return <Badge variant="destructive">Falhou</Badge>;
      default:
        return <Badge variant="outline">Aguardando</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87/100</div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Carga Máxima</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5K</div>
            <p className="text-xs text-muted-foreground">
              usuários simultâneos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              últimos 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Métricas em Tempo Real
          </CardTitle>
          <CardDescription>
            Monitoramento de performance durante a execução dos testes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.name}</span>
                  {getStatusBadge(metric.status)}
                </div>
                <div className="text-2xl font-bold">
                  {metric.value}{metric.unit}
                </div>
                <Progress 
                  value={(metric.value / metric.threshold) * 100} 
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Limite: {metric.threshold}{metric.unit}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Execution Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Controle de Execução
          </CardTitle>
          <CardDescription>
            Execute testes de carga e stress personalizados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="users">Usuários Simultâneos</Label>
              <Input id="users" type="number" placeholder="1000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duração (segundos)</Label>
              <Input id="duration" type="number" placeholder="300" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ramp-up">Ramp-up (segundos)</Label>
              <Input id="ramp-up" type="number" placeholder="60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endpoint">Endpoint</Label>
              <Input id="endpoint" placeholder="/api/endpoint" />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => runStressTest()} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Executando...' : 'Iniciar Teste de Stress'}
            </Button>
            <Button variant="outline" disabled={!isRunning}>
              <Pause className="h-4 w-4 mr-2" />
              Pausar
            </Button>
            <Button variant="outline" disabled={!isRunning}>
              <Square className="h-4 w-4 mr-2" />
              Parar
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Executando teste de stress... ({selectedTest || 'Teste personalizado'})
                </span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      <Tabs defaultValue="tests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tests">Testes de Carga</TabsTrigger>
          <TabsTrigger value="analysis">Análise de Performance</TabsTrigger>
          <TabsTrigger value="scenarios">Cenários de Teste</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          {loadTests.map((test, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {test.name}
                  </span>
                  <div className="flex gap-2">
                    {getTestStatusBadge(test.status)}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => runStressTest(test.id)}
                      disabled={isRunning}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Executar
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  {test.method} {test.endpoint} • {test.users} usuários • {test.duration}s
                </CardDescription>
              </CardHeader>
              <CardContent>
                {test.results ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Tempo de Resposta</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Médio: {test.results.averageResponseTime}ms</div>
                        <div>Máximo: {test.results.maxResponseTime}ms</div>
                        <div>Mínimo: {test.results.minResponseTime}ms</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">Performance</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Taxa de Sucesso: {test.results.successRate}%</div>
                        <div>Throughput: {test.results.throughput} req/s</div>
                        <div>Erros: {test.results.errors}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="font-medium">Carga</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Usuários: {test.users}</div>
                        <div>Duração: {test.duration}s</div>
                        <div>Status: {test.status}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Teste ainda não executado</p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Análise de Performance
              </CardTitle>
              <CardDescription>
                Insights e recomendações baseadas nos resultados dos testes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                  <h4 className="font-medium text-green-800 dark:text-green-200">✅ Pontos Fortes</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
                    <li>• Alta taxa de sucesso (99.2%) nos testes de autenticação</li>
                    <li>• Throughput excelente para operações de leitura</li>
                    <li>• Tempo de resposta consistente sob carga moderada</li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">⚠️ Pontos de Atenção</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                    <li>• Degradação de performance em operações de escrita sob alta carga</li>
                    <li>• Uso de CPU se aproxima do limite crítico (75%)</li>
                    <li>• Alguns endpoints apresentam latência elevada (&gt;2s)</li>
                  </ul>
                </div>

                <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950">
                  <h4 className="font-medium text-red-800 dark:text-red-200">🚨 Ações Requeridas</h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 mt-1 space-y-1">
                    <li>• Otimizar consultas de banco de dados no módulo de busca</li>
                    <li>• Implementar cache para reduzir carga no servidor</li>
                    <li>• Configurar auto-scaling para picos de tráfego</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Cenários de Teste Recomendados
              </CardTitle>
              <CardDescription>
                Cenários baseados em padrões de uso real da aplicação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Cenário: Black Friday</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Simula pico de tráfego durante eventos promocionais
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>👥 5000 usuários</span>
                    <span>⏱️ 30 minutos</span>
                    <span>📈 Ramp-up: 10min</span>
                  </div>
                  <Button size="sm" className="mt-3">Executar Cenário</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Cenário: Carga Normal</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Testa performance durante uso cotidiano da aplicação
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>👥 500 usuários</span>
                    <span>⏱️ 60 minutos</span>
                    <span>📈 Ramp-up: 5min</span>
                  </div>
                  <Button size="sm" className="mt-3">Executar Cenário</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Cenário: Teste de Resistência</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Verifica estabilidade durante períodos prolongados
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>👥 1000 usuários</span>
                    <span>⏱️ 6 horas</span>
                    <span>📈 Ramp-up: 30min</span>
                  </div>
                  <Button size="sm" className="mt-3">Executar Cenário</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}