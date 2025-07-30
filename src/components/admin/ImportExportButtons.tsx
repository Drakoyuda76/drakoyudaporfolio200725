import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImportExportButtonsProps {
  onExport: () => void;
  onImport: (data: any) => Promise<void>;
  exportFilename: string;
}

const ImportExportButtons = ({ onExport, onImport, exportFilename }: ImportExportButtonsProps) => {
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importData = JSON.parse(text);
      await onImport(importData);
      
      toast({
        title: "Sucesso!",
        description: "Dados importados com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      toast({
        title: "Erro",
        description: "Erro ao importar dados. Verifique o formato do arquivo.",
        variant: "destructive",
      });
    }

    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        onClick={onExport}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Exportar JSON
      </Button>
      <label className="cursor-pointer">
        <Button variant="outline" className="flex items-center gap-2" asChild>
          <span>
            <Upload className="w-4 h-4" />
            Importar JSON
          </span>
        </Button>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImportExportButtons;