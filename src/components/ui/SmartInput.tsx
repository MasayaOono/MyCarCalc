"use client";

import { Input, type InputProps } from "@chakra-ui/react";
import { useState, useEffect } from "react";

type SmartInputProps = Omit<InputProps, "onChange" | "value"> & {
  value: number;
  onChange: (e: { target: { value: string } }) => void;
  step?: number;
};

/**
 * SmartInput - 数値入力に特化したスマートなテキスト入力
 *
 * 特徴:
 * - type="text" で「0を消して空にする」ことが可能
 * - 半角数字・小数点・マイナスのみ入力可能
 * - 全角数字はフォーカス外れた時に半角に自動変換
 * - onFocus時に既存の値を全選択（バックスペース不要）
 * - スマホで数字キーボードを表示（inputMode）
 */
export const SmartInput = ({
  value,
  onChange,
  step,
  inputMode = "numeric",
  ...props
}: SmartInputProps) => {
  // 内部では文字列として管理（空文字も許容）
  const [displayValue, setDisplayValue] = useState(String(value));

  // 外部からのvalue変更を反映
  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  // 全角→半角変換
  const toHalfWidth = (str: string): string => {
    return str
      .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
      .replace(/．/g, ".")
      .replace(/ー/g, "-");
  };

  // 半角数字・小数点・マイナスのみ許可
  const sanitize = (str: string): string => {
    // 全角を半角に変換してから、許可文字のみ残す
    const halfWidth = toHalfWidth(str);
    // 数字、小数点、マイナス（先頭のみ）を許可
    return halfWidth.replace(/[^0-9.-]/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const sanitized = sanitize(rawValue);
    setDisplayValue(sanitized);

    // 親に通知（数値に変換）
    const numValue = parseFloat(sanitized) || 0;
    onChange({ target: { value: String(numValue) } });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // フォーカスが外れたら、数値として正規化
    const sanitized = sanitize(displayValue);
    const numValue = parseFloat(sanitized) || 0;
    setDisplayValue(String(numValue));
    onChange({ target: { value: String(numValue) } });
    props.onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // ✨ フォーカス時に全選択（ワンタップで上書き入力可能に）
    e.target.select();
    props.onFocus?.(e);
  };

  return (
    <Input
      type="text"
      inputMode={inputMode}
      pattern="[0-9]*"
      variant="flushed"
      fontSize={{ base: "3xl", md: "4xl" }}
      fontWeight="900"
      textAlign="center"
      border="none"
      p={0}
      color="gray.800"
      _focus={{ outline: "none" }}
      placeholder="0"
      {...props}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

export default SmartInput;
