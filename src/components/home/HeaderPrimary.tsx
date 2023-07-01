import { Divider, Grid, Menu } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar } from '../sub/avatar';
import { ListCourse } from './mockData';

function DropdownList({ label }) {
  return (
    <Menu
      position="bottom-start"
      // trigger="click"
      transitionProps={{
        exitDuration: 0,
      }}
      withinPortal
    >
      <Menu.Target>
        <Link
          key={label}
          className="flex items-center gap-[4px] px-[18px] py-[6px]"
          href="/course"
          onClick={(event) => event.preventDefault()}
        >
          <div key={label} className="flex items-center gap-[4px]">
            <span className="text-[16px] font-normal leading-[24px] tracking-[0.15px]">
              {label}
            </span>
            <Image
              className="pb-1"
              src="/images/home/chevron-down.svg"
              alt="arrow down"
              width={18}
              height={14}
            />
          </div>
        </Link>
      </Menu.Target>
      <Menu.Dropdown className="rounded-lg shadow">
        <div className="w-[645px] py-[12px]">
          <p className="px-[25px] pb-[12px] text-[16px] font-medium leading-[24px] tracking-[0.15px] text-black">
            {label}
          </p>
          <Divider className="w-full border-t-light-border" />
          <Grid className="px-[25px] pt-[15px]">
            {ListCourse.map((item) => (
              <Grid.Col span={6} key={item.name} className="flex gap-[9px]">
                <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md border border-[#C2C2C2]">
                  <img src={item.link} alt="logo" />
                </div>
                <div className="w-[234px]">
                  <p className="text-sm font-semibold text-black">{item.name}</p>
                  <p className="text-sm leading-[17px] text-[#6F6B80]">{item.description}</p>
                </div>
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}

function HeaderNavButton({ label, href }) {
  return (
    <Link
      className="flex items-center px-[18px] py-[6px] text-[16px] font-normal leading-[24px] tracking-[0.15px]"
      href={href}
    >
      {label}
    </Link>
  );
}

const ListPopularCourse = () => {
  return (
    <div className="flex">
      <HeaderNavButton label={'Trang chủ'} href={'/home'}></HeaderNavButton>
      <DropdownList label={'Khóa học'} />
      <HeaderNavButton label={'Blog'} href={'/blog'}></HeaderNavButton>
      <HeaderNavButton label={'Liên hệ'} href={'/contact'}></HeaderNavButton>
    </div>
  );
};

const HeaderPrimary = () => {
  return (
    <div className="flex h-[74px] w-full items-center justify-between border-b border-[#A7A7A7] pl-[50px] pr-[82px]">
      <Image src="/logo-96.png" alt="logo" width={40} height={40} />
      <ListPopularCourse />
      <div className=" flex h-[45px] w-[1100px] rounded-lg  border border-light-border px-[12px]">
        <input
          className="border-none bg-white"
          placeholder="Tìm kiếm"
          // rightSection={
          //   <Image src="/images/home/Adornment-End.svg" alt="search" width={20} height={20} />
          // }
        />
        <Image src="/images/home/Adornment-End.svg" alt="search" width={25} height={25} />
      </div>
      <Avatar dot />
    </div>
  );
};
export default HeaderPrimary;
