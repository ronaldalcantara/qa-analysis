import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Lock, Key, Bug } from 'lucide-react';

interface SecurityIssue {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  file: string;
  line: number;
  recommendation: string;
  cweId?: string;
}

interface SecurityCategory {
  name: string;
  icon: React.ReactNode;
  issues: SecurityIssue[];
  score: number;
}

export function SecurityTestsModule() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const [securityCategories] = useState<SecurityCategory[]>([
    {
      name: 'Vulnerabilidades de Injeção',
      icon: <Bug className="h-5 w-5" />,
      score: 85,
      issues: [
        {
          id: 'sec-1',
          type: 'SQL Injection',
          severity: 'high',
          title: 'Consulta SQL sem prepared statement',
          description: 'Query SQL construída com concatenação de strings pode permitir injeção de código malicioso.',
          file: 'UserRepository.java',
          line: 45,
          recommendation: 'Use prepared statements ou frameworks ORM para prevenir SQL injection.',
          cweId: 'CWE-89'
        },
        {
          id: 'sec-2',
          type: 'XSS',
          severity: 'medium',
          title: 'Saída não sanitizada',
          description: 'Dados do usuário são exibidos sem sanitização adequada.',
          file: 'UserController.java',
          line: 78,
          recommendation: 'Implemente escape/sanitização de dados antes da exibição.',
          cweId: 'CWE-79'
        }
      ]
    },
    {
      name: 'Autenticação e Autorização',
      icon: <Lock className="h-5 w-5" />,
      score: 92,
      issues: [
        {
          id: 'sec-3',
          type: 'Weak Authentication',
          severity: 'medium',
          title: 'Política de senha fraca',
          description: 'Requisitos mínimos de senha não são suficientemente rigorosos.',
          file: 'AuthService.java',
          line: 23,
          recommendation: 'Implemente política de senha mais forte (8+ caracteres, símbolos, números).',
          cweId: 'CWE-521'
        }
      ]
    },
    {
      name: 'Criptografia',
      icon: <Key className="h-5 w-5" />,
      score: 78,
      issues: [
        {
          id: 'sec-4',
          type: 'Weak Encryption',
          severity: 'high',
          title: 'Algoritmo de hash inseguro',
          description: 'Uso de MD5 para hash de senhas é considerado inseguro.',
          file: 'PasswordUtils.java',
          line: 12,
          recommendation: 'Use bcrypt, scrypt ou Argon2 para hash de senhas.',
          cweId: 'CWE-327'
        },
        {
          id: 'sec-5',
          type: 'Hardcoded Secrets',
          severity: 'critical',
          title: 'Chave de API hardcoded',
          description: 'Chave de API está diretamente no código fonte.',
          file: 'ConfigService.java',
          line: 8,
          recommendation: 'Use variáveis de ambiente ou serviços de gerenciamento de segredos.',
          cweId: 'CWE-798'
        }
      ]
    },
    {
      name: 'Exposição de Dados',
      icon: <Eye className="h-5 w-5" />,
      score: 88,
      issues: [
        {
          id: 'sec-6',
          type: 'Information Disclosure',
          severity: 'low',
          title: 'Stack trace em produção',
          description: 'Detalhes técnicos expostos em mensagens de erro.',
          file: 'GlobalExceptionHandler.java',
          line: 34,
          recommendation: 'Log detalhes técnicos apenas em desenvolvimento.',
          cweId: 'CWE-209'
        }
      ]
    }
  ]);

  const runSecurityScan = async () => {
    setIsScanning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 3;
      });
    }, 150);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'hsl(var(--security-critical))';
      case 'high':
        return 'hsl(var(--security-high))';
      case 'medium':
        return 'hsl(var(--security-medium))';
      case 'low':
        return 'hsl(var(--security-low))';
      default:
        return 'hsl(var(--muted))';
    }
  };

  const getSeverityBadge = (severity: string) => {
    const style = { backgroundColor: getSeverityColor(severity), color: 'white' };
    return (
      <Badge style={style}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getSecurityScore = () => {
    const avgScore = securityCategories.reduce((acc, cat) => acc + cat.score, 0) / securityCategories.length;
    return Math.round(avgScore);
  };

  const getTotalIssues = () => {
    return securityCategories.reduce((acc, cat) => acc + cat.issues.length, 0);
  };

  const getCriticalIssues = () => {
    return securityCategories.reduce((acc, cat) => 
      acc + cat.issues.filter(issue => issue.severity === 'critical').length, 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Score de Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getSecurityScore()}/100</div>
            <Progress value={getSecurityScore()} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Issues Encontradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalIssues()}</div>
            <p className="text-xs text-muted-foreground">
              {getCriticalIssues()} críticas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conformidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">OWASP</div>
            <p className="text-xs text-muted-foreground">
              Top 10 verificado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Última Varredura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hoje</div>
            <p className="text-xs text-muted-foreground">
              às 14:30
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Security Scan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Varredura de Segurança
          </CardTitle>
          <CardDescription>
            Execute uma análise completa de segurança no código-fonte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={runSecurityScan} disabled={isScanning}>
              <Shield className="h-4 w-4 mr-2" />
              {isScanning ? 'Escaneando...' : 'Iniciar Varredura Completa'}
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Varredura Rápida
            </Button>
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Verificar Conformidade
            </Button>
          </div>

          {isScanning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analisando vulnerabilidades...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Results */}
      <Tabs defaultValue="vulnerabilities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilidades</TabsTrigger>
          <TabsTrigger value="compliance">Conformidade</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="space-y-4">
          {securityCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </span>
                  <div className="flex gap-2">
                    <Badge variant="outline">Score: {category.score}/100</Badge>
                    <Badge variant="secondary">{category.issues.length} issues</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.issues.map(issue => (
                    <div key={issue.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{issue.title}</h4>
                          {getSeverityBadge(issue.severity)}
                        </div>
                        {issue.cweId && (
                          <Badge variant="outline">{issue.cweId}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                      <p className="text-sm font-medium mb-2">
                        📁 {issue.file}:{issue.line}
                      </p>
                      <div className="p-3 bg-muted rounded border-l-4 border-blue-500">
                        <p className="text-sm">
                          <strong>Recomendação:</strong> {issue.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Verificação de Conformidade
              </CardTitle>
              <CardDescription>
                Análise de conformidade com padrões de segurança
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">OWASP Top 10 2021</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">8/10 Verificados</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">NIST Cybersecurity Framework</span>
                  </div>
                  <Badge variant="secondary">Parcial</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="font-medium">ISO 27001</span>
                  </div>
                  <Badge variant="destructive">Não Verificado</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Recomendações Prioritárias
              </CardTitle>
              <CardDescription>
                Ações recomendadas para melhorar a segurança da aplicação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950">
                  <h4 className="font-medium text-red-800 dark:text-red-200">🚨 Crítico: Remover Chaves Hardcoded</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    Implemente imediatamente um sistema de gerenciamento de segredos para as chaves de API encontradas no código.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200">⚠️ Alto: Atualizar Algoritmos de Hash</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    Substitua MD5 por bcrypt ou Argon2 para hash de senhas em todos os módulos de autenticação.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">📋 Médio: Implementar Validação de Entrada</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Adicione validação e sanitização adequadas para todas as entradas do usuário.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                  <h4 className="font-medium text-green-800 dark:text-green-200">✅ Baixo: Melhorar Logging de Segurança</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Implemente logs de auditoria para operações sensíveis e tentativas de acesso não autorizadas.
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