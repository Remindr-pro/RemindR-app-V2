"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";

interface CodeInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  className?: string;
}

export default function CodeInput({
  length = 6,
  onComplete,
  className = "",
}: CodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length > 1) {
      const digits = numericValue.slice(0, length - index).split("");
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (index + i < length) {
          newCode[index + i] = digit;
        }
      });

      setCode(newCode);

      const nextIndex = Math.min(index + digits.length, length - 1);

      inputRefs.current[nextIndex]?.focus();
    } else if (numericValue.length === 1) {
      const newCode = [...code];

      newCode[index] = numericValue;

      setCode(newCode);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      const newCode = [...code];

      newCode[index] = "";

      setCode(newCode);
    }

    const updatedCode =
      numericValue.length > 1
        ? (() => {
            const digits = numericValue.slice(0, length - index).split("");
            const newCode = [...code];

            digits.forEach((digit, i) => {
              if (index + i < length) {
                newCode[index + i] = digit;
              }
            });

            return newCode;
          })()
        : (() => {
            const newCode = [...code];

            newCode[index] = numericValue;

            return newCode;
          })();

    if (updatedCode.every((digit) => digit !== "") && onComplete) {
      onComplete(updatedCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedData.length > 0) {
      const digits = pastedData.slice(0, length).split("");
      const newCode = [...code];

      digits.forEach((digit, i) => {
        if (i < length) {
          newCode[i] = digit;
        }
      });

      setCode(newCode);

      const lastFilledIndex = Math.min(digits.length - 1, length - 1);

      inputRefs.current[lastFilledIndex]?.focus();

      if (newCode.every((digit) => digit !== "") && onComplete) {
        onComplete(newCode.join(""));
      }
    }
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 md:gap-3 ${className}`}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={code[index]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(index, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(index, e)
          }
          onPaste={handlePaste}
          className="
            w-12 h-12 md:w-14 md:h-14
            rounded-lg
            border border-gray-3
            bg-light
            text-dark
            font-inclusive
            text-2xl md:text-3xl
            font-bold
            text-center
            focus:outline-none
            focus:ring-2
            focus:ring-greenMain
            focus:border-transparent
            transition-all
            duration-200
          "
        />
      ))}
    </div>
  );
}
