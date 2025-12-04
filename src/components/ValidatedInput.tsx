import { Input } from "./ui/input";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "./ui/utils";

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  showValidation?: boolean;
  error?: string;
}

export function ValidatedInput({
  isValid,
  showValidation,
  error,
  className,
  ...props
}: ValidatedInputProps) {
  return (
    <div className="relative">
      <Input
        className={cn(
          className,
          showValidation && isValid && "border-green-500 focus-visible:ring-green-500",
          showValidation && !isValid && error && "border-red-500 focus-visible:ring-red-500"
        )}
        {...props}
      />
      {showValidation && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          {isValid ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            error && <XCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
      )}
    </div>
  );
}
