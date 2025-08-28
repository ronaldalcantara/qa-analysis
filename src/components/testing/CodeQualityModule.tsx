import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Code, FileText, AlertTriangle, CheckCircle, TrendingUp, Bug, Zap } from 'lucide-react';

interface QualityMetric {
  name: string;
  score: number;
  threshold: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
  suggestions: string[];
}

interface CodeIssue {
  id: string;
  type: string;
  severity: 'critical' | 'major' | 'minor' | 'info';
  title: string;
  description: string;
  file: string;
  line: number;
  rule: string;
  suggestion: string;
}

interface DesignPattern {
  name: string;
  usage: 'correct' | 'incorrect' | 'missing' | 'partial';
  description: string;
  recommendation: string;
  examples: string[];
}

export function CodeQualityModule() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [qualityMetrics] = useState<QualityMetric[]>([
    {
      name: 'Complexidade Ciclomática',
      score: 7.2,
      threshold: 10,
      status: 'good',
      description: 'Média de complexidade por método',
      suggestions: ['Refatorar métodos com complexidade > 15', 'Aplicar padrão Strategy para simplificar lógica']
    },
    {
      name: 'Duplicação de Código',
      score: 8.5,
      threshold: 5,
      status: 'warning',
      description: 'Percentual de código duplicado',
      suggestions: ['Extrair código comum para utilitários', 'Implementar padrão Template Method']
    },
    {
      name: 'Cobertura de Testes',
      score: 85,
      threshold: 80,
      status: 'excellent',
      description: 'Percentual de linhas cobertas por testes',
      suggestions: ['Manter cobertura acima de 85%', 'Adicionar testes de integração']
    },
    {
      name: 'Dívida Técnica',
      score: 12,
      threshold: 20,
      status: 'good',
      description: 'Horas estimadas para resolução de issues',
      suggestions: ['Priorizar refatoração de classes críticas', 'Documentar código legado']
    },
    {
      name: 'Acoplamento',
      score: 15,
      threshold: 20,
      status: 'good',
      description: 'Número médio de dependências por classe',
      suggestions: ['Aplicar inversão de dependência', 'Usar injeção de dependência']
    },
    {
      name: 'Coesão',
      score: 78,
      threshold: 70,
      status: 'excellent',
      description: 'Grau de coesão entre métodos das classes',
      suggestions: ['Manter alta coesão nas classes', 'Separar responsabilidades']
    }
  ]);

  const [codeIssues] = useState<CodeIssue[]>([
    {
      id: 'issue-1',
      type: 'Code Smell',
      severity: 'major',
      title: 'Método muito longo',
      description: 'O método processOrder tem 45 linhas, excedendo o limite recomendado de 30.',
      file: 'OrderService.java',
      line: 67,
      rule: 'MaxMethodLength',
      suggestion: 'Divida o método em submétodos menores e mais específicos.'
    },
    {
      id: 'issue-2',
      type: 'Bug',
      severity: 'critical',
      title: 'Possível NullPointerException',
      description: 'Acesso a objeto que pode ser nulo sem verificação prévia.',
      file: 'UserService.java',
      line: 123,
      rule: 'NullPointerCheck',
      suggestion: 'Adicione verificação de nulidade ou use Optional.'
    },
    {
      id: 'issue-3',
      type: 'Vulnerability',
      severity: 'critical',
      title: 'Hardcoded password',
      description: 'Senha codificada diretamente no código fonte.',
      file: 'DatabaseConfig.java',
      line: 15,
      rule: 'HardcodedCredentials',
      suggestion: 'Use variáveis de ambiente ou arquivo de configuração seguro.'
    },
    {
      id: 'issue-4',
      type: 'Code Smell',
      severity: 'minor',
      title: 'Variável não utilizada',
      description: 'Variável declarada mas nunca usada.',
      file: 'ReportGenerator.java',
      line: 89,
      rule: 'UnusedVariable',
      suggestion: 'Remova a variável ou implemente sua utilização.'
    }
  ]);

  const [designPatterns] = useState<DesignPattern[]>([
    {
      name: 'Singleton',
      usage: 'correct',
      description: 'Implementado corretamente na classe DatabaseConnection.',
      recommendation: 'Considere usar injeção de dependência para melhor testabilidade.',
      examples: ['DatabaseConnection.java', 'ConfigurationManager.java']
    },
    {
      name: 'Factory Method',
      usage: 'missing',
      description: 'Criação de objetos complexos feita diretamente nas classes.',
      recommendation: 'Implemente Factory para criação de entidades de domínio.',
      examples: ['UserFactory para criação de diferentes tipos de usuário']
    },
    {
      name: 'Observer',
      usage: 'partial',
      description: 'Implementado parcialmente no sistema de notificações.',
      recommendation: 'Complete a implementação para eventos de auditoria.',
      examples: ['NotificationService.java - apenas para emails']
    },
    {
      name: 'Strategy',
      usage: 'incorrect',
      description: 'Múltiplas condicionais if/else em vez de Strategy pattern.',
      recommendation: 'Refatore cálculos de preço usando Strategy pattern.',
      examples: ['PriceCalculator.java - método calculatePrice()']
    },
    {
      name: 'Repository',
      usage: 'correct',
      description: 'Bem implementado para acesso a dados.',
      recommendation: 'Mantenha a separação clara entre domínio e persistência.',
      examples: ['UserRepository.java', 'OrderRepository.java']
    }
  ]);

  const runCodeAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'hsl(var(--security-critical))';
      case 'major':
        return 'hsl(var(--security-high))';
      case 'minor':
        return 'hsl(var(--security-medium))';
      case 'info':
        return 'hsl(var(--security-low))';
      default:
        return 'hsl(var(--muted))';
    }
  };

  const getPatternStatusIcon = (usage: string) => {
    switch (usage) {
      case 'correct':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'incorrect':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'missing':
        return <Bug className="h-4 w-4 text-orange-600" />;
      case 'partial':
        return <Zap className="h-4 w-4 text-yellow-600" />;
      default:
        return <Code className="h-4 w-4 text-gray-400" />;
    }
  };

  const overallScore = Math.round(
    qualityMetrics.reduce((acc, metric) => {
      const normalized = metric.name === 'Dívida Técnica' 
        ? Math.max(0, 100 - (metric.score / metric.threshold) * 100)
        : Math.min(100, (metric.score / metric.threshold) * 100);
      return acc + normalized;
    }, 0) / qualityMetrics.length
  );

  return (
    <div className="space-y-6">
      {/* Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Score Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallScore}/100</div>
            <Progress value={overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Issues Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {codeIssues.filter(i => i.severity === 'critical').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {codeIssues.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dívida Técnica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {qualityMetrics.find(m => m.name === 'Dívida Técnica')?.score}h
            </div>
            <p className="text-xs text-muted-foreground">
              Para resolver
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Padrões Corretos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {designPatterns.filter(p => p.usage === 'correct').length}/
              {designPatterns.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Design patterns
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Análise de Qualidade de Código
          </CardTitle>
          <CardDescription>
            Execute análise completa de qualidade, padrões e boas práticas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={runCodeAnalysis} disabled={isAnalyzing}>
              <BarChart3 className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analisando...' : 'Iniciar Análise Completa'}
            </Button>
            <Button variant="outline">
              <Code className="h-4 w-4 mr-2" />
              Análise Rápida
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Gerar Relatório
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analisando código...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quality Results */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="patterns">Design Patterns</TabsTrigger>
          <TabsTrigger value="refactoring">Refatoração</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{metric.name}</span>
                    <Badge style={{ backgroundColor: getMetricStatusColor(metric.status), color: 'white' }}>
                      {metric.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{metric.score}</span>
                      <span className="text-sm text-muted-foreground">
                        Limite: {metric.threshold}
                      </span>
                    </div>
                    <Progress 
                      value={metric.name === 'Dívida Técnica' 
                        ? Math.max(0, 100 - (metric.score / metric.threshold) * 100)
                        : Math.min(100, (metric.score / metric.threshold) * 100)
                      } 
                    />
                    <div className="space-y-1">
                      {metric.suggestions.map((suggestion, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">
                          • {suggestion}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {codeIssues.map((issue, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Bug className="h-5 w-5" />
                    {issue.title}
                  </span>
                  <div className="flex gap-2">
                    <Badge style={{ backgroundColor: getSeverityColor(issue.severity), color: 'white' }}>
                      {issue.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{issue.type}</Badge>
                  </div>
                </CardTitle>
                <CardDescription>
                  📁 {issue.file}:{issue.line} • Regra: {issue.rule}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">{issue.description}</p>
                  <div className="p-3 bg-muted rounded border-l-4 border-blue-500">
                    <p className="text-sm">
                      <strong>Sugestão:</strong> {issue.suggestion}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          {designPatterns.map((pattern, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {getPatternStatusIcon(pattern.usage)}
                    {pattern.name}
                  </span>
                  <Badge variant={pattern.usage === 'correct' ? 'default' : 'secondary'}>
                    {pattern.usage.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">{pattern.description}</p>
                  <div className="p-3 bg-muted rounded">
                    <p className="text-sm">
                      <strong>Recomendação:</strong> {pattern.recommendation}
                    </p>
                  </div>
                  {pattern.examples.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Exemplos:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {pattern.examples.map((example, idx) => (
                          <li key={idx}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="refactoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Plano de Refatoração
              </CardTitle>
              <CardDescription>
                Sugestões priorizadas para melhoria da qualidade do código
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950">
                  <h4 className="font-medium text-red-800 dark:text-red-200">🚨 Prioridade Alta</h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 mt-1 space-y-1">
                    <li>• Corrigir hardcoded credentials em DatabaseConfig.java</li>
                    <li>• Resolver NullPointerException em UserService.java</li>
                    <li>• Implementar validação de entrada em todos os controllers</li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">⚠️ Prioridade Média</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                    <li>• Refatorar método processOrder para reduzir complexidade</li>
                    <li>• Implementar Factory pattern para criação de entidades</li>
                    <li>• Extrair código duplicado em utilitários comuns</li>
                  </ul>
                </div>

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">📋 Prioridade Baixa</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                    <li>• Melhorar documentação de métodos públicos</li>
                    <li>• Remover variáveis não utilizadas</li>
                    <li>• Otimizar imports e organizar código</li>
                  </ul>
                </div>

                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                  <h4 className="font-medium text-green-800 dark:text-green-200">✅ Melhoria Contínua</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
                    <li>• Implementar análise de código no CI/CD</li>
                    <li>• Configurar métricas automáticas de qualidade</li>
                    <li>• Estabelecer code reviews obrigatórios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}