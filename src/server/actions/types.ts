export type ActionResponse = { message: string } & (
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    }
);
