import zod from "zod";
export declare const signupInput: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    name: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinInput: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createBlogInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    id: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type SignupInput = zod.infer<typeof signupInput>;
export type SigninInput = zod.infer<typeof signinInput>;
export type CreateBlogInput = zod.infer<typeof createBlogInput>;
export type UpdateBlogInput = zod.infer<typeof updateBlogInput>;
