import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileCode, FolderOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TestUploadProps {
  onProjectChange: (project: string) => void;
}

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  status: 'uploaded' | 'analyzing' | 'completed' | 'error';
  language?: string;
}

export function TestUpload({ onProjectChange }: TestUploadProps) {
  const [projectName, setProjectName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!projectName || !selectedLanguage) {
      toast({
        title: "Informações necessárias",
        description: "Por favor, preencha o nome do projeto e selecione a linguagem.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simular upload e análise
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type || 'unknown',
      status: 'uploaded',
      language: selectedLanguage
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simular progresso de upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Atualizar status dos arquivos para "analyzing"
          setUploadedFiles(current => 
            current.map(file => 
              newFiles.some(nf => nf.name === file.name) 
                ? { ...file, status: 'analyzing' }
                : file
            )
          );

          // Simular análise completa após 3 segundos
          setTimeout(() => {
            setUploadedFiles(current => 
              current.map(file => 
                newFiles.some(nf => nf.name === file.name)
                  ? { ...file, status: 'completed' }
                  : file
              )
            );
            
            toast({
              title: "Análise concluída",
              description: `${newFiles.length} arquivo(s) processado(s) com sucesso.`,
            });
            
            onProjectChange(projectName);
          }, 3000);

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [projectName, selectedLanguage, toast, onProjectChange]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'analyzing':
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileCode className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completo</Badge>;
      case 'analyzing':
        return <Badge variant="secondary">Analisando</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="outline">Enviado</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Configuração do Projeto
          </CardTitle>
          <CardDescription>
            Configure as informações básicas do projeto antes de iniciar a análise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Nome do Projeto</Label>
              <Input
                id="project-name"
                placeholder="Ex: Sistema de Vendas"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Linguagem Principal</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a linguagem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição do Projeto</Label>
            <Textarea
              id="description"
              placeholder="Descreva brevemente o que o projeto faz e seus principais objetivos..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload de Código
          </CardTitle>
          <CardDescription>
            Faça upload dos arquivos de código-fonte e testes para análise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Arraste arquivos aqui ou clique para selecionar</p>
                <p className="text-sm text-muted-foreground">
                  Suporta: .java, .cs, .go, .rs, .xml, .json, .yml
                </p>
              </div>
              <Input
                type="file"
                multiple
                accept=".java,.cs,.go,.rs,.xml,.json,.yml,.yaml,.properties,.toml"
                onChange={handleFileUpload}
                className="mt-4"
                disabled={isUploading}
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enviando arquivos...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Arquivos Enviados
              </span>
              <Badge variant="secondary">{uploadedFiles.length} arquivo(s)</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(file.status)}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.size} • {file.language?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(file.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Actions */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button 
                className="flex-1" 
                disabled={uploadedFiles.some(f => f.status === 'analyzing')}
              >
                Iniciar Análise Completa
              </Button>
              <Button variant="outline">
                Configurações Avançadas
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}