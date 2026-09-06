declare module "gray-matter" {
  interface GrayMatterFile<T = string> {
    data: Record<string, unknown>;
    content: T;
    excerpt?: string;
  }

  interface GrayMatterOption {
    excerpt?: boolean | string | ((input: string) => string);
  }

  function matter<T = string>(
    input: string | Buffer,
    options?: GrayMatterOption,
  ): GrayMatterFile<T>;

  export = matter;
}
