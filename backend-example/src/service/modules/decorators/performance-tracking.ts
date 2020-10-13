import newrelic from "newrelic";

type TrackedFunction = (...args: any[]) => any;

export const withBackgroundTransaction = (
  method: TrackedFunction,
  segmentName: string
): TrackedFunction => {
  return (...args: any[]) => {
    return newrelic.startBackgroundTransaction(segmentName, async () => {
      return method(...args);
    });
  };
};

export const withPerformanceTracking = (
  method: TrackedFunction,
  segmentName: string
): TrackedFunction => {
  return (...args: any[]) => {
    return newrelic.startSegment(segmentName, true, () => method(...args));
  };
};
