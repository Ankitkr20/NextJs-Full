import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Here’s your verification code: {otp}</Preview>

      <Section
        style={{
          backgroundColor: "#f4f4f4",
          padding: "40px 0",
        }}
      >
        <Section
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Row>
            <Heading
              as="h2"
              style={{
                fontSize: "22px",
                marginBottom: "20px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Hello {username},
            </Heading>
          </Row>

          <Row>
            <Text
              style={{ fontSize: "16px", color: "#555", lineHeight: "24px" }}
            >
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </Text>
          </Row>

          <Row>
            <Text
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                letterSpacing: "4px",
                textAlign: "center",
                margin: "20px 0",
                color: "#000",
              }}
            >
              {otp}
            </Text>
          </Row>

          <Row>
            <Text
              style={{ fontSize: "14px", color: "#777", lineHeight: "20px" }}
            >
              If you did not request this code, please ignore this email.
            </Text>
          </Row>

          <Row style={{ marginTop: "30px", textAlign: "center" }}>
            <Button
              href={`http://localhost:3000/verify/${username}`}
              style={{
                backgroundColor: "#61dafb",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "500",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Verify Here
            </Button>
          </Row>
        </Section>
      </Section>
    </Html>
  );
}
