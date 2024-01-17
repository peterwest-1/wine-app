"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { WineFormSchema } from "@/models/wine";
import { wineTypes } from "@/models/wine-type";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { AlertModal } from "@/components/modals/alert-modal";
import { useToast } from "@/components/ui/use-toast";
import { wineVarietals } from "@/models/wine-varietal";

type WineFormValues = z.infer<typeof WineFormSchema>;

interface WineFormProps {
  initialData: WineFormValues | null;
}

export const WineForm: React.FC<WineFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Wine" : "Create Wine";
  const description = initialData ? "Edit a Wine." : "Add a new Wine";
  const action = initialData ? "Save changes" : "Create";
  const toastMessage = initialData ? "Wine updated." : "Wine created.";

  const form = useForm<WineFormValues>({
    resolver: zodResolver(WineFormSchema),
    defaultValues: initialData || {},
  });

  const {
    watch,
    formState: { errors },
  } = form;
  const watchConsumed = watch("consumed");

  const { mutate: create } = api.wine.create.useMutation();
  const { mutate: update } = api.wine.update.useMutation();
  const { mutate: deleteMutation } = api.wine.delete.useMutation();

  const onSubmit = (data: WineFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        update({
          id: parseInt(params.wineId as string),
          wine: {
            ...data,
          },
        });
      } else {
        create({
          ...data,
        });
      }
      router.refresh();
      router.push(`/`);
      toast({ title: toastMessage });
    } catch (error: any) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      deleteMutation({ id: parseInt(params.wineId as string) });
      router.refresh();
      router.push(`/`);
      toast({ title: "Wine deleted." });
    } catch (error: any) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Year"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="varietal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wine Varietal</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a wine varietal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wineVarietals.map(({ value, label }, index) => {
                        return (
                          <SelectItem key={index} value={value}>
                            {label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wine Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a wine type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wineTypes.map(({ value, label }, index) => {
                        return (
                          <SelectItem key={index} value={value}>
                            {label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Rating" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
            <FormField
              control={form.control}
              name="consumed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                      disabled={
                        initialData != null && initialData.consumed == true
                      }
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Consumed?</FormLabel>
                    <FormDescription>
                      Did you consume this bottle?
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {watchConsumed && (
              <FormField
                control={form.control}
                name="consumedAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel>Consumed On</FormLabel>
                    <Popover>
                      <PopoverTrigger
                        asChild
                        disabled={
                          initialData != null && initialData.consumed == true
                        }
                      >
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Date you drank this bottle</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          disabled={(date: any) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
