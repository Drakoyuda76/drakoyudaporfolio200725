import { useState, useEffect } from 'react';
import { X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PinModal = ({ isOpen, onClose, onSuccess }: PinModalProps) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const correctPin = '6516';
  const maxAttempts = 3;

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin === correctPin) {
      onSuccess();
      onClose();
      setPin('');
      setError('');
      setAttempts(0);
    } else {
      setError('PIN incorreto');
      setAttempts(prev => prev + 1);
      setPin('');
      
      if (attempts + 1 >= maxAttempts) {
        setError('Muitas tentativas. Tente novamente mais tarde.');
        setTimeout(() => {
          onClose();
          setAttempts(0);
        }, 2000);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-accent" />
            <span>Acesso Administrativo</span>
          </DialogTitle>
          <DialogDescription>
            Insira o PIN para acessar o painel administrativo
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Digite o PIN de 4 dígitos"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              onKeyDown={handleKeyDown}
              maxLength={4}
              className="text-center text-lg tracking-wider"
              autoFocus
              disabled={attempts >= maxAttempts}
            />
            {error && (
              <p className="text-destructive text-sm mt-2 text-center">{error}</p>
            )}
            {attempts > 0 && attempts < maxAttempts && (
              <p className="text-muted-foreground text-sm mt-2 text-center">
                Tentativa {attempts}/{maxAttempts}
              </p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={pin.length !== 4 || attempts >= maxAttempts}
              className="bg-accent hover:bg-accent/90"
            >
              Acessar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PinModal;