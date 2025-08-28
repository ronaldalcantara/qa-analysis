import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, AlertTriangle, FileText, Plus, Search, Filter } from 'lucide-react';

interface Requirement {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'partial' | 'not_implemented' | 'in_progress';
  coverage: number;
  testCases: string[];
  implementationFiles: string[];
  notes?: string;
}

interface RequirementCategory {
  name: string;
  requirements: Requirement[];
  completionRate: number;
}

export function RequirementsModule() {
  const [isValidating, setIsValidating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [requirementCategories] = useState<RequirementCategory[]>([
    {
      name: 'Funcionais',
      completionRate: 87,
      requirements: [
        {
          id: 'req-f-001',
          category: 'Funcionais',
          title: 'Autenticação de Usuário',
          description: 'O sistema deve permitir login com email e senha, incluindo validação e recuperação de senha.',
          priority: 'high',
          status: 'completed',
          coverage: 95,
          testCases: ['login_valid_credentials', 'login_invalid_credentials', 'password_reset'],
          implementationFiles: ['AuthController.java', 'UserService.java', 'AuthService.java']
        },
        {
          id: 'req-f-002',
          category: 'Funcionais',
          title: 'Gestão de Produtos',
          description: 'CRUD completo para produtos incluindo categorização, preços e estoque.',
          priority: 'high',
          status: 'completed',
          coverage: 92,
          testCases: ['create_product', 'update_product', 'delete_product', 'list_products'],
          implementationFiles: ['ProductController.java', 'ProductService.java', 'ProductRepository.java']
        },
        {
          id: 'req-f-003',
          category: 'Funcionais',
          title: 'Processamento de Pedidos',
          description: 'Sistema de carrinho de compras, cálculo de totais e processamento de pagamentos.',
          priority: 'high',
          status: 'partial',
          coverage: 78,
          testCases: ['add_to_cart', 'calculate_total', 'process_payment'],
          implementationFiles: ['OrderController.java', 'CartService.java'],
          notes: 'Falta implementar validação de estoque e notificações'
        },
        {
          id: 'req-f-004',
          category: 'Funcionais',
          title: 'Relatórios de Vendas',
          description: 'Geração de relatórios de vendas por período, produto e região.',
          priority: 'medium',
          status: 'in_progress',
          coverage: 45,
          testCases: ['generate_sales_report'],
          implementationFiles: ['ReportController.java'],
          notes: 'Em desenvolvimento - versão inicial'
        },
        {
          id: 'req-f-005',
          category: 'Funcionais',
          title: 'Notificações por Email',
          description: 'Envio automático de emails para confirmação de pedidos e promoções.',
          priority: 'low',
          status: 'not_implemented',
          coverage: 0,
          testCases: [],
          implementationFiles: [],
          notes: 'Aguardando definição de provedor de email'
        }
      ]
    },
    {
      name: 'Não Funcionais',
      completionRate: 73,
      requirements: [
        {
          id: 'req-nf-001',
          category: 'Não Funcionais',
          title: 'Performance - Tempo de Resposta',
          description: 'APIs devem responder em menos de 500ms para 95% das requisições.',
          priority: 'high',
          status: 'completed',
          coverage: 88,
          testCases: ['load_test_api', 'stress_test_concurrent_users'],
          implementationFiles: ['Performance tests', 'Load balancer config']
        },
        {
          id: 'req-nf-002',
          category: 'Não Funcionais',
          title: 'Segurança - Criptografia',
          description: 'Dados sensíveis devem ser criptografados em trânsito e em repouso.',
          priority: 'high',
          status: 'partial',
          coverage: 70,
          testCases: ['encryption_test', 'ssl_test'],
          implementationFiles: ['SecurityConfig.java', 'EncryptionService.java'],
          notes: 'Falta implementar criptografia para dados de cartão'
        },
        {
          id: 'req-nf-003',
          category: 'Não Funcionais',
          title: 'Escalabilidade',
          description: 'Sistema deve suportar 10.000 usuários simultâneos.',
          priority: 'medium',
          status: 'partial',
          coverage: 65,
          testCases: ['scalability_test'],
          implementationFiles: ['Load balancer', 'Auto-scaling config'],
          notes: 'Testado até 7.000 usuários com sucesso'
        },
        {
          id: 'req-nf-004',
          category: 'Não Funcionais',
          title: 'Disponibilidade',
          description: 'Sistema deve ter 99.9% de uptime.',
          priority: 'high',
          status: 'completed',
          coverage: 95,
          testCases: ['uptime_monitoring', 'failover_test'],
          implementationFiles: ['Monitoring setup', 'Health checks']
        }
      ]
    },
    {
      name: 'Segurança',
      completionRate: 82,
      requirements: [
        {
          id: 'req-sec-001',
          category: 'Segurança',
          title: 'Controle de Acesso',
          description: 'Implementar RBAC (Role-Based Access Control) para diferentes níveis de usuário.',
          priority: 'high',
          status: 'completed',
          coverage: 90,
          testCases: ['rbac_admin_access', 'rbac_user_access', 'rbac_unauthorized'],
          implementationFiles: ['SecurityConfig.java', 'RoleService.java']
        },
        {
          id: 'req-sec-002',
          category: 'Segurança',
          title: 'Auditoria',
          description: 'Log de todas as operações críticas com timestamp e usuário.',
          priority: 'medium',
          status: 'completed',
          coverage: 85,
          testCases: ['audit_log_test'],
          implementationFiles: ['AuditService.java', 'AuditInterceptor.java']
        },
        {
          id: 'req-sec-003',
          category: 'Segurança',
          title: 'Validação de Entrada',
          description: 'Sanitização e validação de todas as entradas do usuário.',
          priority: 'high',
          status: 'partial',
          coverage: 60,
          testCases: ['input_validation_test'],
          implementationFiles: ['ValidationService.java'],
          notes: 'Falta validação em alguns endpoints'
        }
      ]
    }
  ]);

  const runRequirementsValidation = async () => {
    setIsValidating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsValidating(false);
          return 100;
        }
        return prev + 3;
      });
    }, 150);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'in_progress':
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />;
      case 'not_implemented':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completo</Badge>;
      case 'partial':
        return <Badge variant="secondary">Parcial</Badge>;
      case 'in_progress':
        return <Badge variant="outline">Em Progresso</Badge>;
      case 'not_implemented':
        return <Badge variant="destructive">Não Implementado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Alta</Badge>;
      case 'medium':
        return <Badge variant="secondary">Média</Badge>;
      case 'low':
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const getOverallCompletion = () => {
    const totalRequirements = requirementCategories.reduce((acc, cat) => acc + cat.requirements.length, 0);
    const completedRequirements = requirementCategories.reduce((acc, cat) => 
      acc + cat.requirements.filter(req => req.status === 'completed').length, 0);
    return Math.round((completedRequirements / totalRequirements) * 100);
  };

  const getFilteredRequirements = () => {
    if (selectedCategory === 'all') {
      return requirementCategories.flatMap(cat => cat.requirements);
    }
    const category = requirementCategories.find(cat => cat.name === selectedCategory);
    return category ? category.requirements : [];
  };

  return (
    <div className="space-y-6">
      {/* Requirements Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cumprimento Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOverallCompletion()}%</div>
            <Progress value={getOverallCompletion()} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Requisitos Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requirementCategories.reduce((acc, cat) => acc + cat.requirements.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {requirementCategories.length} categorias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {requirementCategories.reduce((acc, cat) => 
                acc + cat.requirements.filter(req => req.status === 'completed').length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Implementados 100%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {requirementCategories.reduce((acc, cat) => 
                acc + cat.requirements.filter(req => req.status === 'not_implemented').length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Não implementados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Progresso por Categoria
          </CardTitle>
          <CardDescription>
            Status de implementação dos requisitos por categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requirementCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{category.completionRate}%</span>
                    <Badge variant="outline">{category.requirements.length} requisitos</Badge>
                  </div>
                </div>
                <Progress value={category.completionRate} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Validation Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Validação de Requisitos
          </CardTitle>
          <CardDescription>
            Execute validação automática do cumprimento de todos os requisitos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={runRequirementsValidation} disabled={isValidating}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {isValidating ? 'Validando...' : 'Validar Todos os Requisitos'}
            </Button>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Requisito
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Exportar Matriz
            </Button>
          </div>

          {isValidating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Validando cumprimento de requisitos...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Requirements Details */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Requisitos</TabsTrigger>
          <TabsTrigger value="matrix">Matriz de Rastreabilidade</TabsTrigger>
          <TabsTrigger value="coverage">Cobertura</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filtrar por categoria:</span>
                </div>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="all">Todas</option>
                  {requirementCategories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2 ml-auto">
                  <Search className="h-4 w-4" />
                  <Input placeholder="Buscar requisitos..." className="w-64" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements List */}
          <div className="space-y-4">
            {getFilteredRequirements().map((requirement, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {getStatusIcon(requirement.status)}
                      <span className="text-sm font-mono text-muted-foreground">{requirement.id}</span>
                      {requirement.title}
                    </span>
                    <div className="flex gap-2">
                      {getPriorityBadge(requirement.priority)}
                      {getStatusBadge(requirement.status)}
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {requirement.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Cobertura de Testes</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={requirement.coverage} className="flex-1" />
                          <span className="text-sm font-medium">{requirement.coverage}%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Arquivos de Implementação</h4>
                        <div className="flex flex-wrap gap-1">
                          {requirement.implementationFiles.map((file, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {requirement.testCases.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Casos de Teste</h4>
                        <div className="flex flex-wrap gap-1">
                          {requirement.testCases.map((testCase, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {testCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {requirement.notes && (
                      <div className="p-3 bg-muted rounded border-l-4 border-blue-500">
                        <p className="text-sm">
                          <strong>Observações:</strong> {requirement.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Matriz de Rastreabilidade
              </CardTitle>
              <CardDescription>
                Mapeamento entre requisitos, implementação e testes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">Requisito</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Testes</th>
                      <th className="text-left p-2">Implementação</th>
                      <th className="text-left p-2">Cobertura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredRequirements().map((req, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-mono text-xs">{req.id}</td>
                        <td className="p-2">{req.title}</td>
                        <td className="p-2">{getStatusBadge(req.status)}</td>
                        <td className="p-2">{req.testCases.length}</td>
                        <td className="p-2">{req.implementationFiles.length}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Progress value={req.coverage} className="w-16" />
                            <span className="text-xs">{req.coverage}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Análise de Cobertura
              </CardTitle>
              <CardDescription>
                Detalhamento da cobertura de requisitos por área
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                  <h4 className="font-medium text-green-800 dark:text-green-200">✅ Áreas Bem Cobertas</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
                    <li>• Autenticação e Controle de Acesso (95% cobertura)</li>
                    <li>• Gestão de Produtos (92% cobertura)</li>
                    <li>• Monitoramento e Disponibilidade (95% cobertura)</li>
                  </ul>
                </div>
                
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">⚠️ Áreas com Cobertura Parcial</h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                    <li>• Processamento de Pedidos (78% cobertura)</li>
                    <li>• Segurança - Criptografia (70% cobertura)</li>
                    <li>• Escalabilidade (65% cobertura)</li>
                  </ul>
                </div>

                <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950">
                  <h4 className="font-medium text-red-800 dark:text-red-200">🚨 Requisitos Não Atendidos</h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 mt-1 space-y-1">
                    <li>• Notificações por Email (0% implementado)</li>
                    <li>• Relatórios de Vendas (45% implementado)</li>
                    <li>• Validação de Entrada completa (60% cobertura)</li>
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