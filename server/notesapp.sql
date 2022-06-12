-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 12, 2022 at 11:49 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notesapp`
--
CREATE DATABASE IF NOT EXISTS `notesapp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `notesapp`;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `body`, `createdAt`) VALUES
(1, 'First note', '<p>This is my first note!</p>', '2022-06-09 19:52:31.848'),
(2, 'Second note', '<div>\n<div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure autem at perspiciatis sequi quisquam odio, porro doloribus est in officia esse, iusto explicabo! Cupiditate magni nisi ipsum mollitia illum sapiente, unde doloribus deleniti dolorum non ullam accusamus, possimus dicta, assumenda nesciunt ipsa dolores aliquam perferendis quo amet. Cupiditate soluta quos dolore velit molestias voluptatibus accusantium saepe at illo voluptas dicta veritatis, officiis sapiente. Itaque consequuntur, cumque hic ipsum mollitia placeat repudiandae tempora rerum iusto, inventore enim possimus alias? Quisquam dolore unde atque laudantium expedita facere eaque vel architecto cumque omnis nesciunt eos ratione minus dolorum aspernatur rerum, officia placeat tempora adipisci a modi quae soluta voluptatem! Vel voluptates facilis ipsa deleniti nihil odio earum corporis omnis facere ducimus, sequi minus in dolore labore ea pariatur error quidem! Ullam excepturi odio tempora veritatis minus quasi ad quaerat libero, eos harum numquam! Explicabo eius earum incidunt quae. Incidunt atque cupiditate officiis expedita, laborum maxime. Laudantium quia obcaecati, suscipit eum vero iste voluptatum incidunt facilis rerum a aspernatur ut voluptates aliquid vitae ipsam delectus tempora aperiam provident illum beatae eius natus! Beatae assumenda quae perferendis aut minima ducimus! Debitis iste neque quasi sed, nulla eius exercitationem sit est vel quo laborum esse nisi ducimus soluta, nam illum repellendus cupiditate fuga ea repudiandae cum sequi iure quod. Atque, adipisci consequatur illum nulla quasi, accusamus beatae incidunt optio blanditiis dolorem doloribus, saepe soluta ad fugit. Eius quaerat voluptatibus reprehenderit error molestiae totam nostrum soluta sunt quia, in animi! Quibusdam iusto, at voluptatum hic mollitia placeat voluptatem accusamus. Blanditiis repellendus omnis eligendi voluptates autem, quasi minima at recusandae libero culpa voluptate aperiam hic porro reiciendis assumenda totam asperiores itaque ducimus sunt voluptatem officiis nemo vero doloremque. Iure quidem officia dicta commodi esse vel voluptatibus. Quae quis, doloremque qui modi animi assumenda distinctio dolores optio suscipit et id labore adipisci. Doloribus magnam saepe eveniet hic rem deleniti nobis, ex, ullam nisi a dolorem perferendis expedita! Praesentium perferendis alias itaque. Doloremque atque delectus consequatur suscipit deserunt, tempora minus iure dolor quod sequi voluptatem ipsam, odit harum. Omnis eos laborum ratione ipsa dolore, rerum harum libero necessitatibus modi ducimus, expedita inventore qui! Tempora deleniti aliquid recusandae maxime reiciendis odio? Quae eaque consequatur accusantium quia nostrum impedit, vero quos facere laborum commodi sequi magni aut dignissimos, iste unde! Quod deleniti sint rem, esse delectus vero adipisci harum at assumenda velit. Aliquam nostrum distinctio a quasi mollitia eius libero itaque saepe amet deleniti eum corrupti recusandae autem doloremque voluptatibus, dolorem facilis, dignissimos quibusdam magnam rerum. Eos quis repudiandae ex sint quae quas corporis sunt saepe. Eveniet, aut aperiam! Itaque explicabo sequi laudantium, non officiis quia minima? Quam ullam, tempore deserunt eum cupiditate, non numquam perspiciatis, voluptatem itaque corrupti necessitatibus ab sit rem eaque repellendus fugit dicta dolores ducimus. Mollitia quo excepturi eaque beatae placeat voluptate soluta blanditiis unde earum nemo quia saepe ad, voluptatem maiores ipsum esse doloribus sapiente perspiciatis id magnam assumenda? Quod tempore laudantium ratione labore hic sit sint? Harum eveniet quasi blanditiis non optio beatae iure nulla, expedita accusantium ipsa doloribus sequi molestias, id modi illum eius deleniti totam fugit consectetur, sunt maxime exercitationem cum repellat. Vero debitis laboriosam, sed dolorum atque voluptates suscipit unde aliquam voluptate minima tenetur delectus accusantium similique aspernatur distinctio, quis dignissimos eum! Libero est dolorum nemo in, quasi ut laudantium ipsum sit officia obcaecati ab possimus unde maxime facilis a culpa ipsa quae dignissimos nam. Ipsa, possimus eaque illum corporis maiores repellendus voluptate nisi. Voluptatum maiores atque deserunt nobis. In voluptates officia rerum recusandae consequuntur amet optio, fuga eos ab minima voluptatibus facilis dolores possimus expedita omnis enim odit, suscipit dignissimos. Molestias inventore possimus officiis aut repudiandae magnam, quam tenetur mollitia reprehenderit odit nihil modi neque porro et tempora sapiente. Debitis officia necessitatibus voluptatem dicta quaerat facere nemo. Magnam voluptate architecto illum assumenda itaque possimus ullam, nihil optio? Eum, dicta! Molestias unde nulla a odio quisquam, neque voluptates corporis ad odit eaque dolore veniam hic. Nobis quisquam dolorum hic, perspiciatis porro nam enim nostrum minima magni amet perferendis fugiat iure eum nemo maiores numquam neque accusamus commodi. Quod quidem magni ut perferendis ipsum! Nesciunt dicta a natus, placeat sapiente sunt cupiditate quidem odio accusantium beatae nam et? Aut possimus quo consequatur adipisci iure earum laborum ipsum consectetur quia distinctio laboriosam ratione maiores saepe quisquam laudantium mollitia eius, molestias fugiat fugit amet alias iste voluptatibus harum at. Aliquid est placeat ea excepturi fugiat minus qui temporibus dolorum, facilis iure tenetur asperiores labore eos corrupti nesciunt laboriosam repudiandae animi doloribus cum praesentium ipsa a hic eveniet impedit. Laudantium provident dignissimos, obcaecati libero, similique ad velit inventore sunt, reprehenderit iusto ipsa rem tempore. Corporis fuga, modi repudiandae in accusamus dignissimos possimus quaerat ut voluptatum facilis eligendi iusto nemo culpa. Voluptatibus, necessitatibus! Sit exercitationem quis quasi omnis ipsam in ratione, dignissimos aspernatur ea nisi deserunt veritatis animi totam ullam et nulla numquam repellendus! At dolorum obcaecati aliquid voluptas doloremque sint unde earum id nihil qui sapiente quis provident, iusto voluptates veritatis quaerat soluta praesentium perspiciatis pariatur in porro inventore vel consectetur. Labore similique natus ea veritatis minima, perspiciatis animi delectus beatae provident officia harum fugit quia a quod est cumque atque impedit optio magni error quo, eius aut! Minima expedita, quibusdam tempora sequi distinctio ratione pariatur voluptatem amet. Unde, omnis? Mollitia itaque voluptas aliquam? Quae, quasi veniam magni pariatur eligendi a, dolorum labore accusantium consequuntur consequatur nostrum esse exercitationem alias corporis nulla tempore possimus suscipit deleniti modi soluta? Reprehenderit, obcaecati molestiae. Unde fugit quae ea optio architecto ex vel tempore doloribus! Repudiandae nobis officiis quidem ad. Voluptatem placeat aliquam laboriosam aliquid consequuntur necessitatibus velit voluptatum provident? Maiores, reprehenderit id dignissimos illum autem accusamus, blanditiis esse iure necessitatibus perferendis aut at doloribus excepturi, eveniet quos. Ipsum quas autem consectetur tenetur! Impedit quas ut illo aliquam, deleniti officia sequi eveniet? Itaque eaque sunt excepturi dolorem nihil hic ipsum dolor quos culpa voluptatum. Cupiditate earum quaerat sed, ipsam dolor quisquam dicta qui! Ratione itaque maxime aliquid explicabo illo ullam eius amet, incidunt tempore nemo autem alias neque ducimus delectus sapiente.</div>\n</div>', '2022-06-09 19:53:40.865'),
(3, 'Third note', '<p>This is a <span style=\"background-color: rgb(53, 152, 219); color: rgb(241, 196, 15);\">cool</span> note!</p>\n<h1>YOoo..</h1>', '2022-06-09 19:55:46.104');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notes_title_key` (`title`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
