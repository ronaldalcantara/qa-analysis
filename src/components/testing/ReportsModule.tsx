import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, FileText, BarChart3, TrendingUp, Shield, Zap, CheckCircle } from 'lucide-react';
import { ManualPDFGenerator } from './ManualPDFGenerator';

interface ReportMetric {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'executive' | 'technical' | 'quality' | 'security' | 'performance';
  lastGenerated: string;
  format: string[];
  size: string;
  status: 'ready' | 'generating' | 'error';
}

export function ReportsModule() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('last30days');
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');

  const [metrics] = useState<ReportMetric[]>([
    {
      name: 'Taxa de Sucesso dos Testes',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      status: 'excellent'
    },
    {
      name: 'Cobertura de Código',
      value: '87.5%',
      change: '+1.8%',
      trend: 'up',
      status: 'good'
    },
    {
      name: 'Vulnerabilidades Críticas',
      value: '2',
      change: '-3',
      trend: 'up',
      status: 'warning'
    },
    {
      name: 'Tempo de Resposta Médio',
      value: '245ms',
      change: '-15ms',
      trend: 'up',
      status: 'excellent'
    },
    {
      name: 'Dívida Técnica',
      value: '12h',
      change: '-4h',
      trend: 'up',
      status: 'good'
    },
    {
      name: 'Conformidade OWASP',
      value: '85%',
      change: '+5%',
      trend: 'up',
      status: 'good'
    }
  ]);

  const [reports] = useState<Report[]>([
    {
      id: 'exec-summary',
      title: 'Relatório Executivo',
      description: 'Visão geral de alta qualidade sobre qualidade, segurança e performance',
      type: 'executive',
      lastGenerated: '2024-03-15 14:30',
      format: ['PDF', 'PowerPoint'],
      size: '2.1 MB',
      status: 'ready'
    },
    {
      id: 'tech-detailed',
      title: 'Relatório Técnico Detalhado',
      description: 'Análise técnica completa incluindo código, arquitetura e testes',
      type: 'technical',
      lastGenerated: '2024-03-15 13:45',
      format: ['PDF', 'HTML'],
      size: '8.7 MB',
      status: 'ready'
    },
    {
      id: 'quality-assessment',
      title: 'Avaliação de Qualidade',
      description: 'Métricas de qualidade de código, design patterns e boas práticas',
      type: 'quality',
      lastGenerated: '2024-03-15 12:20',
      format: ['PDF', 'Excel'],
      size: '1.8 MB',
      status: 'ready'
    },
    {
      id: 'security-analysis',
      title: 'Análise de Segurança',
      description: 'Vulnerabilidades, conformidade e recomendações de segurança',
      type: 'security',
      lastGenerated: '2024-03-15 11:15',
      format: ['PDF'],
      size: '3.2 MB',
      status: 'ready'
    },
    {
      id: 'performance-report',
      title: 'Relatório de Performance',
      description: 'Resultados de testes de carga, stress e otimizações',
      type: 'performance',
      lastGenerated: '2024-03-15 10:30',
      format: ['PDF', 'Dashboard'],
      size: '4.5 MB',
      status: 'ready'
    }
  ]);

  const generateReport = async (reportId?: string) => {
    setIsGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 4;
      });
    }, 200);
  };

  const getMetricStatusColor = (status: string) => {
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-400" />;
    }
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'executive':
        return <BarChart3 className="h-5 w-5 text-blue-600" />;
      case 'technical':
        return <FileText className="h-5 w-5 text-purple-600" />;
      case 'quality':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'security':
        return <Shield className="h-5 w-5 text-red-600" />;
      case 'performance':
        return <Zap className="h-5 w-5 text-yellow-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-800">Pronto</Badge>;
      case 'generating':
        return <Badge variant="secondary">Gerando</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div 
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: getMetricStatusColor(metric.status) }}
                />
                <span className="text-xs text-muted-foreground capitalize">{metric.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Geração de Relatórios
          </CardTitle>
          <CardDescription>
            Configure e gere relatórios personalizados para diferentes audiências
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                  <SelectItem value="last30days">Últimos 30 dias</SelectItem>
                  <SelectItem value="last3months">Últimos 3 meses</SelectItem>
                  <SelectItem value="custom">Período personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Formato</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="powerpoint">PowerPoint</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Data Personalizada</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Selecionar período
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => generateReport()} disabled={isGenerating}>
              <FileText className="h-4 w-4 mr-2" />
              {isGenerating ? 'Gerando...' : 'Gerar Relatório Completo'}
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatório Executivo
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Dashboard Interativo
            </Button>
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compilando relatório...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Relatórios Disponíveis</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="schedule">Agendamento</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {getReportIcon(report.type)}
                      {report.title}
                    </span>
                    <div className="flex gap-2">
                      {getStatusBadge(report.status)}
                      <Badge variant="outline">{report.size}</Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>📅 {new Date(report.lastGenerated).toLocaleString('pt-BR')}</span>
                      <span>📁 {report.format.join(', ')}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => generateReport(report.id)}
                        disabled={isGenerating}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Regenerar
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Templates de Relatório
              </CardTitle>
              <CardDescription>
                Modelos pré-definidos para diferentes tipos de relatório
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">Template Executivo</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Visão de alto nível com métricas-chave e insights estratégicos
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Personalizar</Button>
                    <Button size="sm" variant="ghost">Usar</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium">Template de Segurança</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Foco em vulnerabilidades, conformidade e riscos de segurança
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Personalizar</Button>
                    <Button size="sm" variant="ghost">Usar</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium">Template de Performance</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Análise detalhada de performance e otimizações
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Personalizar</Button>
                    <Button size="sm" variant="ghost">Usar</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium">Template de Qualidade</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Métricas de qualidade de código e conformidade
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Personalizar</Button>
                    <Button size="sm" variant="ghost">Usar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <ManualPDFGenerator />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Agendamento Automático
              </CardTitle>
              <CardDescription>
                Configure geração automática de relatórios em intervalos regulares
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Relatório Semanal - Executivo</h4>
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Toda sexta-feira às 17:00 • Enviado para: executivos@empresa.com
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Editar</Button>
                    <Button size="sm" variant="ghost">Pausar</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Relatório Mensal - Completo</h4>
                    <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Primeiro dia útil do mês às 09:00 • Enviado para: tech-leads@empresa.com
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Editar</Button>
                    <Button size="sm" variant="ghost">Pausar</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg border-dashed">
                  <div className="text-center">
                    <h4 className="font-medium mb-2">Criar Novo Agendamento</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Configure relatórios automáticos para sua equipe
                    </p>
                    <Button size="sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Novo Agendamento
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}