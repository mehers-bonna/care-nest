
export async function generateMetadata({ params }) {

  const { id } = await params; 

  if (!id) {
    return { title: "Service Details - CareNest" };
  }

  const serviceName = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${serviceName} - CareNest`,
    description: `Expert ${serviceName} services by CareNest. We ensure the best care for your family members.`,
  };
}

export default function DetailsLayout({ children }) {
  return <>{children}</>;
}