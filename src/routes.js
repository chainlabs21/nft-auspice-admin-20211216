import * as React from "react";

//Pages
const MemberState = React.lazy(() => import("./pages/member/MemberState"));
const MemberInfo = React.lazy(() => import("./pages/member/MemberInfo"));
const ItemState = React.lazy(() => import("./pages/marketManage/ItemState"));
const OrdersState = React.lazy(() => import("./pages/marketManage/OrdersState"));
const ItemDetail = React.lazy(() => import("./pages/marketManage/ItemDetail"));
const MintingInspection = React.lazy(() =>
  import("./pages/marketManage/MintingInspection")
);
const ManageCategory = React.lazy(() =>
  import("./pages/marketManage/ManageCategory")
);
const Curation = React.lazy(() => import("./pages/marketManage/Curation"));

const StatState = React.lazy(() => import("./pages/statistics/StatState"));
const StatInfo = React.lazy(() => import("./pages/statistics/StatInfo"));
const Ranking = React.lazy(() => import("./pages/statistics/Ranking"));

const Faq = React.lazy(() => import("./pages/support/Faq"));
const Notice = React.lazy(() => import("./pages/support/Notice"));
const NoticeDetail = React.lazy(() => import("./pages/support/NoticeDetail"));
const SettingManager = React.lazy(() =>
  import("./pages/support/SettingManager")
);
const SettingOperate = React.lazy(() =>
  import("./pages/support/SettingOperate")
);

const SystemAccount = React.lazy(() => import("./pages/system/SystemAccount"));

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));

const routes = [
  {
    path: "/dashboard/",
    exact: true,
    name: "대쉬 보드",
    component: DashboardDefault,
  },
  {
    path: "/member/state",
    exact: true,
    name: "회원 현황",
    component: MemberState,
  },
  {
    path: "/member/info",
    exact: true,
    name: "회원 상세",
    component: MemberInfo,
  },
  {
    path: "/item/state",
    exact: true,
    name: "ITEM 현황",
    component: ItemState,
  },
  {
    path: "/item/detail",
    exact: false,
    name: "ITEM 상세",
    component: ItemDetail,
  },
  {
    path: "/item/state/orders",
    exact: true,
    name: "주문 조회",
    component: OrdersState,
  },
  {
    path: "/mintingInspection",
    exact: true,
    name: "Minting Inspection",
    component: MintingInspection,
  },
  {
    path: "/marketCategoryManage",
    exact: true,
    name: "마켓카테고리 관리",
    component: ManageCategory,
  },
  {
    path: "/curation",
    exact: true,
    name: "메인화면 큐레이션",
    component: Curation,
  },
  {
    path: "/statistics/state",
    exact: true,
    name: "통계 현황",
    component: StatState,
  },
  {
    path: "/statistics/info",
    exact: true,
    name: "통계 상세",
    component: StatInfo,
  },
  {
    path: "/ranking",
    exact: true,
    name: "랭킹",
    component: Ranking,
  },
  {
    path: "/support/notice",
    exact: true,
    name: "공지 사항",
    component: Notice,
  },
  {
    path: "/support/notice/detail",
    exact: false,
    name: "공지 작성 및 수정",
    component: NoticeDetail,
  },
  {
    path: "/support/faq",
    exact: true,
    name: "FAQ 자주하는 질문",
    component: Faq,
  },
  {
    path: "/setting/operate",
    exact: true,
    name: "운영 설정",
    component: SettingOperate,
  },
  {
    path: "/setting/manager",
    exact: true,
    name: "관리자 설정",
    component: SettingManager,
  },
  {
    path: "/system/account",
    exact: true,
    name: "시스템 계정",
    component: SystemAccount,
  },
];
export default routes;
