interface IUser {
  id: string
  username: string
  nickname: string
  avatar: string
  email: string
  token: string
  description: string
  score: number
  topicCount: number
  commnetCount: number
  fansCount: number
  followCount: number
  emailVerified: boolean
}

interface IFile {
  id: string
  originalname: string
  filename: string
  type: string
  size: number
  url: string
  createAt: string
}

interface ITopic {
  id: string
  title: string
  content: string
  summary: string
  recommand: number
  viewCount: number
  commentCount: number
  likeCount: number
  favoriteCount: number
  lastCommentTime: string
  lastCommentUser: string // 评论人名称
  userAgent: string
  ip: string
  category: ICategory
  userId: string
  createAt: string
  updateAt: string
  user: IUser
  isLike: 0 | 1
}

interface ITag {
  id: string
  label: string
  value: string
  articleCount?: number
}

interface ICategory {
  id: string
  name: string
  label: string
  description: string
  logo: string
  sortNo: string
  status: number
  topics: ITopic[]
}

interface IKnowledge {
  id: string
  parentId: string
  order: number
  title: string
  cover?: string
  summary: string
  content: string
  html: string
  toc: string
  views: number
  likes: number
  status: 'draft' | 'publish'
  isCommentable?: boolean
  createAt: string
  updateAt: string
  publishAt: string
  children?: Array<IKnowledge>
}

interface IPage {
  id: string
  name: string
  path: string
  cover?: string
  content: string
  html: string
  toc: string
  status: string
  views: number
  createAt: string
  publishAt: string
}

interface IComment {
  id: string
  content: string
  likeCount: string
  commentcount: string
  user: IUser
  entityId: string
  quoteId: string
  createAt: Date
}

interface IView {
  id: string
  ip: string
  userAgent: string
  url: string
  count: number
  createAt: string
  updateAt: string
}

interface IMail {
  id: string
  from: string
  to: string
  subject: number
  text: string
  html: string
  createAt: string
}

interface ISearch {
  id: string
  type: string
  keyword: string
  count: number
  createAt: string
}

interface ISetting {
  i18n?: string
  systemUrl?: string // 系统地址
  systemTitle?: string // 系统标题
  systemBg?: string // 全局背景
  systemLogo?: string // 系统 Logo
  systemFavicon?: string // 系统 favicon
  systemFooterInfo?: string // 系统页脚信息
  seoKeyword?: string // SEO 关键词
  seoDesc?: string //  SEO 描述
  baiduAnalyticsId?: string // 百度统计id
  googleAnalyticsId?: string // 谷歌分析 id
}

interface PagerList<T> {
  records: T[]
  total: number
}

interface IUserScore {
  userId: string
  username: string
  nickname: string
  avatar: string
  topicCount: string
  commentCount: string
  score: string
}

interface IResource {
  id: string
  name: string
  url: string
  haveCode: boolean
  code?: any
  accessible: boolean
  lastCheckTime?: any
  userId: string
  isPublic: boolean
  score?: number
  content: string
  recommend: number
  viewCount: number
  commentCount: number
  likeCount: number
  favoriteCount: number
  lastCommentTime?: any
  lastCommentUser?: any
  deletedTime?: any
  createAt: string
  updateAt: string
  category?: ICategory
  user: IUser
  havePayed: boolean
}

type IEntityType = 'topic' | 'resource' | 'reward'

type IEntity = ITopic | IResource | IReward

interface IReward {
  id: string
  title: string
  content: string
  viewCount: number
  commentCount: number
  likeCount: number
  favoriteCount: number
  score: number
  isPublic: boolean
  status: 'finish'  | "underway"
  cancelType: string
  deletedTime?: any
  createAt: string
  updateAt: string
  user: IUser
  rewardUser?: IUser
  rewardAnswers: IRewardAnswer[]
  category: ICategory
  confirmedRewardAnswer: IRewardAnswer
}

interface IRewardAnswer {
  id: string;
  content: string;
  user:IUser;
  reward:IReward;
  isConfirmedAnswer: boolean;
  createAt: string
  updateAt: string
}