const chartData = {
  items: [
    {
      id: "general",
      title: "일반",
      type: "group",
      level: 0,
      children: [
        {
          id: "dashboard",
          title: "대쉬보드",
          type: "item",
          url: "/dashboard",
          level: 0,
        },
      ],
    },
    {
      id: "member",
      title: "회원",
      type: "group",
      level: 0,

      children: [
        {
          id: "memberState",
          title: "회원현황",
          type: "item",
          url: "/member/state",
          level: 0,
        },
        {
          id: "memberInfo",
          title: "회원상세",
          type: "item",
          url: "/member/info",
          level: 0,
        },
      ],
    },
    {
      id: "marketManage",
      title: "마켓관리",
      type: "group",
      level: 0,

      children: [
        {
          id: "itemState",
          title: "ITEM 현황",
          type: "item",
          url: "/item/state",
          level: 0,
        },
        {
          id: "orderState",
          title: "주문 조회",
          type: "item",
          url: "/item/state/orders",
          level: 0,
        },
        {
          id: "transactionState",
          title: "트랜잭션 조회",
          type: "item",
          url: "/item/state/transaction",
          level: 0,
        },
        {
          id: "salesHistory",
          title: "판매 내역",
          type: "item",
          url: "/item/state/sales",
          level: 0,
        },
        {
          id: "MintingInspection",
          title: "신고접수",
          type: "item",
          url: "/mintingInspection",
          level: 0,
        },
        {
          id: "marketCategoryManage",
          title: "마켓카테고리관리",
          type: "item",
          url: "/marketCategoryManage",
          level: 0,
        },
        {
          id: "curation",
          title: "큐레이션",
          type: "item",
          url: "/curation",
          level: 0,
        },
      ],
    },



    {
      id: "auction",
      title: "경매관리",
      type: "group",
      level: 0,

      children: [
        {
          id: "auctionSettlement",
          title: "경매 정산",
          type: "item",
          url: "/auction/settlement",
          level: 0,
        },
      ],
    },





    {
      id: "statistics",
      title: "통계",
      type: "group",
      level: 0,
      children: [
        {
          id: "statisticsState",
          title: "통계현황",
          type: "item",
          url: "/statistics/state",
          level: 0,
        },
        {
          id: "statisticsInfo",
          title: "통계상세",
          type: "item",
          url: "/statistics/info",
          level: 0,
        },
        {
          id: "ranking",
          title: "랭킹",
          type: "item",
          url: "/ranking",
          level: 0,
        },
      ],
    },
    {
      id: "support",
      title: "고객지원",
      type: "group",
      level: 0,

      children: [
        {
          id: "notice",
          title: "공지사항",
          type: "item",
          url: "/support/notice",
          level: 0,
        },
        {
          id: "faq",
          title: "FAQ",
          type: "item",
          url: "/support/faq",
          level: 0,
        },
      ],
    },
    {
      id: "setting",
      title: "설정",
      type: "group",
      level: 3,

      children: [
        {
          id: "operateSetting",
          title: "운영설정",
          type: "item",
          url: "/setting/operate",
          level: 3,
        },
        {
          id: "managerSetting",
          title: "관리자설정",
          type: "item",
          url: "/setting/manager",
          level: 3,
        },
      ],
    },
    {
      id: "system",
      title: "시스템",
      type: "group",
      level: 3,

      children: [
        {
          id: "systemAccount",
          title: "시스템 계정",
          type: "item",
          url: "/system/account",
          level: 3,
        },
      ],
    },
  ],
};
export default chartData;
