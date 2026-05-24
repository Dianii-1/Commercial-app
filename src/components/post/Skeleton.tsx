import { Skeleton } from "@heroui/react";

export const SkeletonPost = () => {
  return (
    <div className="shadow-panel space-y-5 rounded-lg bg-transparent p-4">
      <Skeleton animationType="pulse" className="h-48 rounded-md" />
      <div className="space-y-3">
        <Skeleton animationType="pulse" className="h-3 w-3/5 rounded-lg" />
        <Skeleton animationType="pulse" className="h-3 w-4/5 rounded-lg" />
        <div className="flex justify-between">
          <Skeleton animationType="pulse" className="h-3 w-2/5 rounded-lg" />
          <div className="flex gap-4">
            <Skeleton animationType="pulse" className="h-3 w-2/5 rounded-lg" />
            <Skeleton animationType="pulse" className="h-3 w-2/5 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
