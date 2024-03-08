import { type EmailOtpType } from "@supabase/supabase-js";
import { cookies, headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { routes } from "routes";
import { createClient } from "supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const { searchParams } = new URL(requestUrl);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const origin = headers().get("x-forwarded-host");
  const protocol = headers().get("x-forwarded-proto");
  const redirectTo = `${protocol}://${origin}`;

  if (token_hash && type) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      if (type === "recovery") {
        return NextResponse.redirect(redirectTo + routes.resetPasswordNew);
      }
      return NextResponse.redirect(redirectTo);
    }

    // return the user to an error page with some instructions
    return NextResponse.redirect(redirectTo + routes.verifyError({ message: error.message }));
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(
    redirectTo +
      routes.verifyError({
        message: "Invalid token or expired link. Please try again.",
      }),
  );
}
