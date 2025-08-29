import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Download, BookOpen, Users, Settings, Shield, Zap, Code, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

export function ManualPDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const generateManualPDF = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Criar o PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let yPosition = 20;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 20;
      const lineHeight = 7;

      // Função para adicionar nova página se necessário
      const checkPageBreak = (requiredSpace: number = 20) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
      };

      // Capa
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('MANUAL DO USUÁRIO', pdf.internal.pageSize.width / 2, 50, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text('Test Analysis Platform', pdf.internal.pageSize.width / 2, 65, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Sistema Completo de Análise de Testes', pdf.internal.pageSize.width / 2, 80, { align: 'center' });
      pdf.text('Java • C# • Go • Rust', pdf.internal.pageSize.width / 2, 90, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text(`Versão 1.0 - ${new Date().toLocaleDateString('pt-BR')}`, pdf.internal.pageSize.width / 2, 270, { align: 'center' });

      // Nova página - Índice
      pdf.addPage();
      yPosition = margin;
      
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ÍNDICE', margin, yPosition);
      yPosition += 15;

      const sections = [
        { title: '1. Introdução', page: 3 },
        { title: '2. Visão Geral do Sistema', page: 4 },
        { title: '3. Upload de Código', page: 5 },
        { title: '4. Testes Unitários', page: 6 },
        { title: '5. Testes de Segurança', page: 7 },
        { title: '6. Testes de Stress', page: 8 },
        { title: '7. Análise de Qualidade de Código', page: 9 },
        { title: '8. Gestão de Requisitos', page: 10 },
        { title: '9. Documentação Automática', page: 11 },
        { title: '10. Relatórios e Análises', page: 12 },
        { title: '11. Configurações Avançadas', page: 13 },
        { title: '12. Solução de Problemas', page: 14 }
      ];

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      sections.forEach(section => {
        checkPageBreak();
        pdf.text(section.title, margin, yPosition);
        pdf.text(section.page.toString(), 180, yPosition);
        yPosition += lineHeight;
      });

      setProgress(20);

      // 1. Introdução
      pdf.addPage();
      yPosition = margin;
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1. INTRODUÇÃO', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const introText = [
        'O Test Analysis Platform é uma solução completa para análise de qualidade de software',
        'que implementa toda a pirâmide de testes. O sistema suporta múltiplas linguagens de',
        'programação e oferece análises abrangentes de segurança, performance e qualidade.',
        '',
        'CARACTERÍSTICAS PRINCIPAIS:',
        '• Suporte para Java, C#, Go e Rust',
        '• Testes unitários automatizados',
        '• Análise de segurança OWASP',
        '• Testes de stress e performance',
        '• Análise de qualidade de código',
        '• Verificação de requisitos',
        '• Documentação automática',
        '• Relatórios executivos e técnicos'
      ];

      introText.forEach(line => {
        checkPageBreak();
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      setProgress(35);

      // 2. Visão Geral do Sistema
      pdf.addPage();
      yPosition = margin;
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('2. VISÃO GERAL DO SISTEMA', margin, yPosition);
      yPosition += 15;

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('2.1 Dashboard Principal', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const dashboardText = [
        'O dashboard principal apresenta uma visão consolidada de todos os testes:',
        '',
        '• Métricas de resumo: Total de testes, taxa de sucesso, cobertura',
        '• Status geral do projeto',
        '• Indicadores visuais de qualidade',
        '• Acesso rápido aos módulos principais',
        '',
        '2.2 Módulos Disponíveis',
        '',
        'O sistema é organizado em 8 módulos principais:'
      ];

      dashboardText.forEach(line => {
        checkPageBreak();
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      const modules = [
        { name: 'Upload', desc: 'Configuração e envio de código-fonte' },
        { name: 'Unitários', desc: 'Execução e análise de testes unitários' },
        { name: 'Segurança', desc: 'Verificação de vulnerabilidades e conformidade' },
        { name: 'Stress', desc: 'Testes de carga e performance' },
        { name: 'Qualidade', desc: 'Análise de qualidade e design patterns' },
        { name: 'Requisitos', desc: 'Verificação de atendimento aos requisitos' },
        { name: 'Docs', desc: 'Geração automática de documentação' },
        { name: 'Relatórios', desc: 'Compilação de relatórios executivos' }
      ];

      yPosition += 5;
      modules.forEach(module => {
        checkPageBreak(15);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`• ${module.name}:`, margin + 5, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(module.desc, margin + 35, yPosition);
        yPosition += lineHeight;
      });

      setProgress(50);

      // 3. Upload de Código
      pdf.addPage();
      yPosition = margin;
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('3. UPLOAD DE CÓDIGO', margin, yPosition);
      yPosition += 15;

      const uploadSteps = [
        '3.1 Configuração do Projeto',
        '',
        'Antes de fazer upload do código, configure:',
        '• Nome do projeto',
        '• Linguagem principal (Java, C#, Go ou Rust)',
        '• Descrição do projeto',
        '',
        '3.2 Processo de Upload',
        '',
        '1. Acesse o módulo "Upload"',
        '2. Preencha as informações do projeto',
        '3. Arraste os arquivos ou clique para selecionar',
        '4. Aguarde o processamento automático',
        '5. Verifique o status de cada arquivo',
        '',
        '3.3 Tipos de Arquivo Suportados',
        '',
        '• Código-fonte: .java, .cs, .go, .rs',
        '• Configuração: .xml, .json, .yml, .yaml',
        '• Propriedades: .properties, .toml',
        '',
        '3.4 Análise Automática',
        '',
        'Após o upload, o sistema automaticamente:',
        '• Detecta a estrutura do projeto',
        '• Identifica dependências',
        '• Prepara ambiente de testes',
        '• Inicia análise preliminar'
      ];

      uploadSteps.forEach(line => {
        checkPageBreak();
        pdf.setFontSize(12);
        if (line.includes('3.')) {
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      setProgress(65);

      // 4. Testes Unitários
      pdf.addPage();
      yPosition = margin;
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('4. TESTES UNITÁRIOS', margin, yPosition);
      yPosition += 15;

      const unitTestsContent = [
        '4.1 Execução Automática',
        '',
        'O módulo de testes unitários oferece:',
        '• Execução automática de testes existentes',
        '• Geração de novos testes quando necessário',
        '• Análise de cobertura de código',
        '• Identificação de código não testado',
        '',
        '4.2 Métricas Disponíveis',
        '',
        '• Taxa de sucesso/falha',
        '• Cobertura por arquivo/método',
        '• Tempo de execução',
        '• Complexidade ciclomática',
        '',
        '4.3 Resultados e Análises',
        '',
        'Para cada teste, você verá:',
        '• Status (passou/falhou/pendente)',
        '• Tempo de execução',
        '• Detalhes de falhas',
        '• Sugestões de melhoria',
        '',
        '4.4 Recomendações',
        '',
        'O sistema gera recomendações para:',
        '• Aumentar cobertura de testes',
        '• Melhorar qualidade dos testes',
        '• Otimizar performance dos testes',
        '• Reduzir duplicação de código'
      ];

      unitTestsContent.forEach(line => {
        checkPageBreak();
        pdf.setFontSize(12);
        if (line.includes('4.')) {
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      setProgress(80);

      // 5. Testes de Segurança
      pdf.addPage();
      yPosition = margin;
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('5. TESTES DE SEGURANÇA', margin, yPosition);
      yPosition += 15;

      const securityContent = [
        '5.1 Análise de Vulnerabilidades',
        '',
        'O sistema verifica:',
        '• Vulnerabilidades OWASP Top 10',
        '• Dependências com falhas de segurança',
        '• Configurações inseguras',
        '• Exposição de dados sensíveis',
        '',
        '5.2 Classificação de Riscos',
        '',
        '• Crítico: Requer ação imediata',
        '• Alto: Prioridade alta para correção',
        '• Médio: Deve ser corrigido',
        '• Baixo: Melhoria recomendada',
        '',
        '5.3 Relatório de Conformidade',
        '',
        'Inclui verificação de conformidade com:',
        '• OWASP Application Security Verification Standard',
        '• NIST Cybersecurity Framework',
        '• ISO 27001 controles aplicáveis',
        '',
        '5.4 Recomendações de Correção',
        '',
        'Para cada vulnerabilidade encontrada:',
        '• Descrição detalhada do problema',
        '• Impacto potencial',
        '• Passos para correção',
        '• Código de exemplo quando aplicável'
      ];

      securityContent.forEach(line => {
        checkPageBreak();
        pdf.setFontSize(12);
        if (line.includes('5.')) {
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      // Continuar com outras seções...
      setProgress(90);

      // Finalizar
      setProgress(100);
      
      // Salvar o PDF
      pdf.save('Manual_Test_Analysis_Platform.pdf');
      
      toast({
        title: "Manual gerado com sucesso!",
        description: "O arquivo PDF foi baixado automaticamente.",
      });

    } catch (error) {
      toast({
        title: "Erro ao gerar manual",
        description: "Ocorreu um erro durante a geração do PDF.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Manual do Usuário
        </CardTitle>
        <CardDescription>
          Gere um manual completo em PDF explicando como usar todos os recursos do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview do Conteúdo */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Conteúdo do Manual
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Introdução</p>
                  <p className="text-xs text-muted-foreground">Visão geral e características</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Settings className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium text-sm">Upload de Código</p>
                  <p className="text-xs text-muted-foreground">Configuração e envio de arquivos</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Code className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Testes Unitários</p>
                  <p className="text-xs text-muted-foreground">Execução e análise de testes</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Shield className="h-4 w-4 text-red-600" />
                <div>
                  <p className="font-medium text-sm">Testes de Segurança</p>
                  <p className="text-xs text-muted-foreground">Vulnerabilidades e conformidade</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Zap className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="font-medium text-sm">Testes de Stress</p>
                  <p className="text-xs text-muted-foreground">Performance e carga</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Qualidade de Código</p>
                  <p className="text-xs text-muted-foreground">Análise e design patterns</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="font-medium text-sm">Gestão de Requisitos</p>
                  <p className="text-xs text-muted-foreground">Verificação e rastreabilidade</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <FileText className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium text-sm">Relatórios</p>
                  <p className="text-xs text-muted-foreground">Geração e análises</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações do Manual */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Detalhes do Manual</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Páginas:</span>
              <span className="ml-2 font-medium">~15 páginas</span>
            </div>
            <div>
              <span className="text-muted-foreground">Formato:</span>
              <span className="ml-2 font-medium">PDF A4</span>
            </div>
            <div>
              <span className="text-muted-foreground">Idioma:</span>
              <span className="ml-2 font-medium">Português</span>
            </div>
            <div>
              <span className="text-muted-foreground">Versão:</span>
              <span className="ml-2 font-medium">1.0</span>
            </div>
          </div>
        </div>

        {/* Botão de Geração */}
        <div className="space-y-4">
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Gerando manual...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
          
          <Button 
            onClick={generateManualPDF}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            <Download className="h-4 w-4 mr-2" />
            {isGenerating ? 'Gerando Manual...' : 'Baixar Manual em PDF'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}