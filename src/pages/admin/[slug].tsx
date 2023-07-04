import { useRouter } from 'next/router';

import { AdminLayout, mapAdminPage } from '../../layouts/Admin/Admin';

const ManageAdmin = () => {
  // get query params
  const router = useRouter();

  const { slug } = router.query;

  // if query params change, update the page
  console.log({ slug });

  return <div className="flex h-[860px] flex-1">{mapAdminPage[slug as string]}</div>;
};

const Manage = () => {
  return (
    <AdminLayout>
      <ManageAdmin />
    </AdminLayout>
  );
};

export default Manage;
