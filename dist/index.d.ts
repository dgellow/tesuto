export declare function report(testName: string, testFn: () => void): void;
export declare function testing(groupName: string, groupFn: () => void): void;
export declare function result(): number;
declare const _default: {
    report: typeof report;
    testing: typeof testing;
    result: typeof result;
};
export default _default;
