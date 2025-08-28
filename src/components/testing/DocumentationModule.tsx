import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, RefreshCw, BookOpen, Code, Database, Shield, Zap } from 'lucide-react';

interface DocumentSection {
  id: string;
  title: string;
  description: string;
  status: 'complete' | 'partial' | 'missing';
  lastUpdated: string;
  wordCount: number;
  coverage: number;
}

interface Documentation {
  category: string;
  icon: React.ReactNode;
  sections: DocumentSection[];
  completionRate: number;
}

export function DocumentationModule() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<string>('');

  const [documentation] = useState<Documentation[]>([
    {
      category: 'Documentação Técnica',
      icon: <Code className="h-5 w-5" />,
      completionRate: 78,
      sections: [
        {
          id: 'tech-arch',
          title: 'Arquitetura do Sistema',
          description: 'Visão geral da arquitetura, componentes principais e fluxo de dados.',
          status: 'complete',
          lastUpdated: '2024-03-15',
          wordCount: 2450,
          coverage: 95
        },
        {
          id: 'tech-api',
          title: 'Documentação de APIs',
          description: 'Especificação completa dos endpoints REST, parâmetros e exemplos.',
          status: 'complete',
          lastUpdated: '2024-03-14',
          wordCount: 3200,
          coverage: 92
        },
        {
          id: 'tech-db',
          title: 'Schema de Banco de Dados',
          description: 'Diagrama ER, tabelas, relacionamentos e índices.',
          status: 'partial',
          lastUpdated: '2024-03-10',
          wordCount: 1200,
          coverage: 65
        },
        {
          id: 'tech-deploy',
          title: 'Guia de Deploy',
          description: 'Procedimentos de deployment, configuração de ambiente e CI/CD.',
          status: 'partial',
          lastUpdated: '2024-03-08',
          wordCount: 800,
          coverage: 55
        }
      ]
    },
    {
      category: 'Documentação Funcional',
      icon: <BookOpen className="h-5 w-5" />,
      completionRate: 85,
      sections: [
        {
          id: 'func-req',
          title: 'Especificação de Requisitos',
          description: 'Detalhamento completo dos requisitos funcionais e não funcionais.',
          status: 'complete',
          lastUpdated: '2024-03-16',
          wordCount: 4100,
          coverage: 98
        },
        {
          id: 'func-user',
          title: 'Manual do Usuário',
          description: 'Guia completo para utilização da aplicação pelos usuários finais.',
          status: 'complete',
          lastUpdated: '2024-03-12',
          wordCount: 2800,
          coverage: 88
        },
        {
          id: 'func-admin',
          title: 'Manual do Administrador',
          description: 'Procedimentos administrativos, configurações e manutenção.',
          status: 'partial',
          lastUpdated: '2024-03-09',
          wordCount: 1500,
          coverage: 70
        },
        {
          id: 'func-flows',
          title: 'Fluxos de Processo',
          description: 'Diagramas de fluxo dos principais processos de negócio.',
          status: 'complete',
          lastUpdated: '2024-03-11',
          wordCount: 1800,
          coverage: 90
        }
      ]
    },
    {
      category: 'Documentação de Testes',
      icon: <Zap className="h-5 w-5" />,
      completionRate: 72,
      sections: [
        {
          id: 'test-plan',
          title: 'Plano de Testes',
          description: 'Estratégia de testes, cenários e critérios de aceitação.',
          status: 'complete',
          lastUpdated: '2024-03-13',
          wordCount: 2200,
          coverage: 85
        },
        {
          id: 'test-cases',
          title: 'Casos de Teste',
          description: 'Detalhamento de todos os casos de teste unitários e integração.',
          status: 'partial',
          lastUpdated: '2024-03-14',
          wordCount: 3500,
          coverage: 75
        },
        {
          id: 'test-results',
          title: 'Relatórios de Execução',
          description: 'Resultados das execuções de teste e métricas de qualidade.',
          status: 'complete',
          lastUpdated: '2024-03-15',
          wordCount: 1600,
          coverage: 82
        },
        {
          id: 'test-perf',
          title: 'Testes de Performance',
          description: 'Resultados dos testes de carga, stress e escalabilidade.',
          status: 'partial',
          lastUpdated: '2024-03-10',
          wordCount: 900,
          coverage: 45
        }
      ]
    },
    {
      category: 'Documentação de Segurança',
      icon: <Shield className="h-5 w-5" />,
      completionRate: 68,
      sections: [
        {
          id: 'sec-policy',
          title: 'Política de Segurança',
          description: 'Diretrizes e políticas de segurança da informação.',
          status: 'complete',
          lastUpdated: '2024-03-12',
          wordCount: 1800,
          coverage: 90
        },
        {
          id: 'sec-vulns',
          title: 'Análise de Vulnerabilidades',
          description: 'Relatório detalhado das vulnerabilidades encontradas e correções.',
          status: 'partial',
          lastUpdated: '2024-03-14',
          wordCount: 1200,
          coverage: 60
        },
        {
          id: 'sec-incident',
          title: 'Plano de Resposta a Incidentes',
          description: 'Procedimentos para resposta a incidentes de segurança.',
          status: 'missing',
          lastUpdated: '',
          wordCount: 0,
          coverage: 0
        },
        {
          id: 'sec-audit',
          title: 'Logs de Auditoria',
          description: 'Configuração e análise dos logs de auditoria do sistema.',
          status: 'partial',
          lastUpdated: '2024-03-08',
          wordCount: 600,
          coverage: 40
        }
      ]
    }
  ]);

  const generateDocumentation = async (docId?: string) => {
    setIsGenerating(true);
    setProgress(0);
    setSelectedDoc(docId || 'all');
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <div className="h-2 w-2 bg-green-500 rounded-full" />;
      case 'partial':
        return <div className="h-2 w-2 bg-yellow-500 rounded-full" />;
      case 'missing':
        return <div className="h-2 w-2 bg-red-500 rounded-full" />;
      default:
        return <div className="h-2 w-2 bg-gray-400 rounded-full" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">Completo</Badge>;
      case 'partial':
        return <Badge variant="secondary">Parcial</Badge>;
      case 'missing':
        return <Badge variant="destructive">Ausente</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const getOverallCompletion = () => {
    const totalSections = documentation.reduce((acc, doc) => acc + doc.sections.length, 0);
    const completeSections = documentation.reduce((acc, doc) => 
      acc + doc.sections.filter(section => section.status === 'complete').length, 0);
    return Math.round((completeSections / totalSections) * 100);
  };

  const getTotalWordCount = () => {
    return documentation.reduce((acc, doc) => 
      acc + doc.sections.reduce((sectionAcc, section) => sectionAcc + section.wordCount, 0), 0
    ).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Documentation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completude Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOverallCompletion()}%</div>
            <Progress value={getOverallCompletion()} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Seções Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documentation.reduce((acc, doc) => acc + doc.sections.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {documentation.length} categorias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Palavras Escritas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalWordCount()}</div>
            <p className="text-xs text-muted-foreground">
              Total de conteúdo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hoje</div>
            <p className="text-xs text-muted-foreground">
              Documentação ativa
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
            Status da documentação por área do projeto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentation.map((doc, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {doc.icon}
                    <span className="font-medium">{doc.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{doc.completionRate}%</span>
                    <Badge variant="outline">{doc.sections.length} seções</Badge>
                  </div>
                </div>
                <Progress value={doc.completionRate} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Geração de Documentação
          </CardTitle>
          <CardDescription>
            Gere ou atualize automaticamente a documentação do projeto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={() => generateDocumentation()} disabled={isGenerating}>
              <RefreshCw className="h-4 w-4 mr-2" />
              {isGenerating ? 'Gerando...' : 'Gerar Documentação Completa'}
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Atualizar Existente
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Gerando documentação... ({selectedDoc === 'all' ? 'Completa' : selectedDoc})
                </span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documentation Details */}
      <Tabs defaultValue="sections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sections">Seções</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="export">Exportação</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          {documentation.map((doc, docIndex) => (
            <Card key={docIndex}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {doc.icon}
                    {doc.category}
                  </span>
                  <div className="flex gap-2">
                    <Badge variant="outline">{doc.completionRate}% completo</Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => generateDocumentation(doc.category)}
                      disabled={isGenerating}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Atualizar
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doc.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(section.status)}
                        <div>
                          <p className="font-medium">{section.title}</p>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>📄 {section.wordCount.toLocaleString()} palavras</span>
                            {section.lastUpdated && (
                              <span>📅 {new Date(section.lastUpdated).toLocaleDateString('pt-BR')}</span>
                            )}
                            <span>📊 {section.coverage}% cobertura</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(section.status)}
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Templates de Documentação
              </CardTitle>
              <CardDescription>
                Modelos padrão para diferentes tipos de documentação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">📋 Especificação de Requisitos</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Template para documentação de requisitos funcionais e não funcionais
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Usar Template</Button>
                    <Button size="sm" variant="ghost">Personalizar</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">🏗️ Documentação de Arquitetura</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Template para documentação técnica da arquitetura do sistema
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Usar Template</Button>
                    <Button size="sm" variant="ghost">Personalizar</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">🧪 Plano de Testes</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Template para documentação de estratégia e casos de teste
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Usar Template</Button>
                    <Button size="sm" variant="ghost">Personalizar</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">🔒 Documentação de Segurança</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Template para políticas e procedimentos de segurança
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Usar Template</Button>
                    <Button size="sm" variant="ghost">Personalizar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Exportação de Documentos
              </CardTitle>
              <CardDescription>
                Exporte a documentação em diferentes formatos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-medium mb-2">PDF Completo</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Toda documentação em um único arquivo PDF
                    </p>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Gerar PDF
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <Code className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-medium mb-2">HTML Interativo</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Site navegável com toda a documentação
                    </p>
                    <Button size="sm" className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Gerar HTML
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg text-center">
                    <Database className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-medium mb-2">Word/DOCX</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Formato editável para colaboração
                    </p>
                    <Button size="sm" className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Gerar DOCX
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Configurações de Exportação</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium min-w-32">Incluir código:</label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium min-w-32">Incluir diagramas:</label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium min-w-32">Índice automático:</label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium min-w-32">Numeração de páginas:</label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
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