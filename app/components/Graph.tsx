"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface GraphProps {
  data: { date: string; amount: number }[];
}

export function Graph({ data }: GraphProps) {
  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
        },
      }}
      className="
    h-full 
    w-full 
    sm:w-[90%] 
    md:w-[80%] 
    lg:w-[70%] 
    xl:w-[90%] 
    sm:col-span-2 
    md:col-span-3 
    lg:col-span-4 
    sm:row-span-1 
    md:row-span-2 
    lg:row-span-1
  "
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line type="monotone" dataKey="amount" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
