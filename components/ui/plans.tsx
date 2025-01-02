"use client"

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, MinusIcon } from 'lucide-react';

// ... keep the existing PlanFeature interface and planFeatures array ...

interface PlanProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: PlanProps[] = [
  {
    name: "Free",
    price: 0,
    description: "For individuals just getting started with AI chatbots",
    features: ["1 chatbot", "100 messages/month", "Basic customization"],
  },
  {
    name: "Startup",
    price: 39,
    description: "For small teams exploring AI-powered customer support",
    features: ["5 chatbots", "1,000 messages/month", "Advanced customization", "Priority support"],
    popular: true,
  },
  {
    name: "Team",
    price: 89,
    description: "For growing businesses with multiple AI use cases",
    features: ["20 chatbots", "10,000 messages/month", "Full customization", "API access", "Dedicated account manager"],
  },
  {
    name: "Enterprise",
    price: 149,
    description: "For large organizations with complex AI requirements",
    features: ["Unlimited chatbots", "Unlimited messages", "Custom integrations", "On-premise deployment option", "24/7 premium support"],
  },
];

const PricingCard: React.FC<PlanProps & { selected: boolean; onSelect: () => void }> = ({
  name,
  price,
  description,
  features,
  popular,
  selected,
  onSelect,
}) => (
  <Card className={`${popular ? 'border-primary' : ''} ${selected ? 'ring-2 ring-primary' : ''}`}>
    <CardHeader className="text-center pb-2">
      {popular && <Badge className="uppercase w-max self-center mb-3">Most popular</Badge>}
      <CardTitle className="mb-7">{name}</CardTitle>
      <span className="font-bold text-5xl">${price}</span>
    </CardHeader>
    <CardDescription className="text-center w-11/12 mx-auto">
      {description}
    </CardDescription>
    <CardContent>
      <ul className="mt-7 space-y-2.5 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex space-x-2">
            <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant={selected ? "default" : "outline"} onClick={onSelect}>
        {selected ? "Selected" : "Select"}
      </Button>
    </CardFooter>
  </Card>
);

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <>
      {/* Pricing */}
      <div className="container">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Choose Your AI Chatbot Plan
          </h2>
          <p className="mt-1 text-muted-foreground">
            Scale your AI-powered conversations with our flexible pricing options.
          </p>
        </div>
        {/* End Title */}

        {/* Switch */}
        <div className="flex justify-center items-center mb-8">
          <Label htmlFor="payment-schedule" className="me-3">
            Monthly
          </Label>
          <Switch id="payment-schedule" checked={isAnnual} onCheckedChange={setIsAnnual} />
          <Label htmlFor="payment-schedule" className="relative ms-3">
            Annual
            <span className="absolute -top-10 start-auto -end-28">
              <span className="flex items-center">
                <svg
                  className="w-14 h-8 -me-6"
                  width={45}
                  height={25}
                  viewBox="0 0 45 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                </svg>
                <Badge className="mt-3 uppercase">Save up to 10%</Badge>
              </span>
            </span>
          </Label>
        </div>
        {/* End Switch */}

        {/* Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              price={isAnnual ? Math.floor(plan.price * 12 * 0.9) : plan.price}
              selected={selectedPlan === plan.name}
              onSelect={() => handlePlanSelect(plan.name)}
            />
          ))}
        </div>
        {/* End Grid */}

        {/* Comparison table */}
        {/* ... keep the existing comparison table code ... */}
      </div>
      {/* End Pricing */}
    </>
  );
}

