import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
} from "react-email";

type Props = {
  name?: string;
  pageviews: number;
  articleTitle?: string;
  articleUrl?: string;
};

const CelebrationTemplate = ({
  name,
  pageviews,
  articleTitle,
  articleUrl,
}: Props) => {
  return (
    <Html lang="en">
      <Head />
      <Tailwind>
        <Body className="m-0 bg-slate-50 p-5 font-sans text-slate-900">
          <Container className="mx-auto max-w-150">
            <Section className="pb-3">
              <Text className="m-0 font-bold text-[18px] text-slate-900">
                Wikimasters
              </Text>
            </Section>

            <Section className="rounded-lg bg-white p-6">
              <Heading className="m-0 mb-2 font-normal text-[20px] leading-7">
                🎉 Nice work{name ? `, ${name}` : ""}!
              </Heading>

              <Text className="m-0 mb-4 text-slate-700">
                Your article{articleTitle ? ` "${articleTitle}"` : ""} just hit{" "}
                <strong>{pageviews}</strong> views — that's a milestone.
              </Text>

              {articleUrl ? (
                <Link
                  className="inline-block rounded-md bg-[#0ea5a4] px-3.5 py-2.5 font-semibold text-white no-underline"
                  href={articleUrl}
                >
                  View article
                </Link>
              ) : null}

              <Text className="mt-4.5 mb-0 text-[13px] text-slate-400">
                Keep writing — you're helping other people learn. — The
                Wikimasters team
              </Text>
            </Section>

            <Section className="pt-3.5">
              <Text className="m-0 text-[12px] text-slate-400">
                You’re receiving this email because you authored content on
                Wikimasters.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CelebrationTemplate;
