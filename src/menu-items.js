const chartData = {
  items: [
    {
      id: "general",
      title: "일반",
      type: "group",
      children: [
        {
          id: "dashboard",
          title: "대쉬보드",
          type: "item",
          url: "/dashboard",
        },
      ],
    },
    {
      id: "member",
      title: "회원",
      type: "group",

      children: [
        {
          id: "memberState",
          title: "회원현황",
          type: "item",
          url: "/member/state",
        },
        {
          id: "memberInfo",
          title: "회원상세",
          type: "item",
          url: "/member/info",
        },
      ],
    },
    {
      id: "marketManage",
      title: "마켓관리",
      type: "group",

      children: [
        {
          id: "itemState",
          title: "ITEM 현황",
          type: "item",
          url: "/item/state",
        },
        {
          id: "orderState",
          title: "주문 조회",
          type: "item",
          url: "/item/state/orders",
        },
        {
          id: "transactionState",
          title: "트랜잭션 조회",
          type: "item",
          url: "/item/state/transaction",
        },
        {
          id: "MintingInspection",
          title: "MintingInspection",
          type: "item",
          url: "/mintingInspection",
        },
        {
          id: "marketCategoryManage",
          title: "마켓카테고리관리",
          type: "item",
          url: "/marketCategoryManage",
        },
        {
          id: "curation",
          title: "큐레이션",
          type: "item",
          url: "/curation",
        },
      ],
    },
    {
      id: "statistics",
      title: "통계",
      type: "group",
      children: [
        {
          id: "statisticsState",
          title: "통계현황",
          type: "item",
          url: "/statistics/state",
        },
        {
          id: "statisticsInfo",
          title: "통계상세",
          type: "item",
          url: "/statistics/info",
        },
        {
          id: "ranking",
          title: "랭킹",
          type: "item",
          url: "/ranking",
        },
      ],
    },
    {
      id: "support",
      title: "고객지원",
      type: "group",

      children: [
        {
          id: "notice",
          title: "공지사항",
          type: "item",
          url: "/support/notice",
        },
        {
          id: "faq",
          title: "FAQ",
          type: "item",
          url: "/support/faq",
        },
      ],
    },
    {
      id: "setting",
      title: "설정",
      type: "group",

      children: [
        {
          id: "operateSetting",
          title: "운영설정",
          type: "item",
          url: "/setting/operate",
        },
        {
          id: "managerSetting",
          title: "관리자설정",
          type: "item",
          url: "/setting/manager",
        },
      ],
    },
    {
      id: "system",
      title: "시스템",
      type: "group",

      children: [
        {
          id: "systemAccount",
          title: "시스템 계정",
          type: "item",
          url: "/system/account",
        },
      ],
    },
  ],
};
export default chartData;
