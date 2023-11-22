import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RegisterForm } from "@/app/_components/auth/register-form";
import { withPublicOnlyPage } from "@/app/_hoc/with-public-only-page";

type Params = { locale: string };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "register" });
  return {
    title: t("title"),
  };
}

function RegisterPage() {
  return <RegisterForm />;
}

export default withPublicOnlyPage(RegisterPage);
