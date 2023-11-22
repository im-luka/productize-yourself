import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/app/_components/auth/login-form";
import { withPublicOnlyPage } from "@/app/_hoc/with-public-only-page";

type Params = { locale: string };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "login" });
  return {
    title: t("title"),
  };
}

function LoginPage() {
  return <LoginForm />;
}

export default withPublicOnlyPage(LoginPage);
