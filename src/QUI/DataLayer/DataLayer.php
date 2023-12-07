<?php

namespace QUI\DataLayer;

use QUI;
use QUI\Projects\Project;
use QUI\Utils\System\File;

use function file_exists;
use function file_get_contents;
use function file_put_contents;
use function str_replace;
use function unlink;

class DataLayer
{
    protected string $dir;

    public function __construct()
    {
        $this->dir = ETC_DIR . 'plugins/quiqqer/dataLayer/';

        File::mkdir($this->dir);
    }

    /**
     * @param Project $Project
     * @param $type
     * @param $key
     * @return string
     */
    public function getDataLayerValue(Project $Project, $type, $key): string
    {
        $file = $this->getProjectFolder($Project, $type) . $key . '.html';

        if (file_exists($file)) {
            return file_get_contents($file);
        }

        return '';
    }

    //region header begin

    public function addHeaderBegin(Project $Project, $key, $htmlScript)
    {
        $this->setFileContent(
            $Project,
            'headerBegin',
            $key,
            $htmlScript
        );
    }

    public function removeHeaderBegin(Project $Project, $key)
    {
        $file = $this->getProjectFolder($Project, 'headerBegin') . $key . '.html';

        if (file_exists($file)) {
            unlink($file);
        }
    }

    public function getHeaderBegin(Project $Project): string
    {
        return $this->combineFilesInDir(
            $this->getProjectFolder($Project, 'headerBegin')
        );
    }

    //endregion

    //region header End

    public function addHeaderEnd(Project $Project, $key, $htmlScript)
    {
        $this->setFileContent(
            $Project,
            'headerEnd',
            $key,
            $htmlScript
        );
    }

    public function removeHeaderEnd(Project $Project, $key)
    {
        $file = $this->getProjectFolder($Project, 'headerEnd') . $key . '.html';

        if (file_exists($file)) {
            unlink($file);
        }
    }

    public function getHeaderEnd(Project $Project): string
    {
        return $this->combineFilesInDir(
            $this->getProjectFolder($Project, 'headerEnd')
        );
    }

    //endregion

    //region body begin

    public function addBodyBegin(Project $Project, $key, $htmlScript)
    {
        $this->setFileContent(
            $Project,
            'bodyBegin',
            $key,
            $htmlScript
        );
    }

    public function removeBodyBegin(Project $Project, $key)
    {
        $file = $this->getProjectFolder($Project, 'bodyBegin') . $key . '.html';

        if (file_exists($file)) {
            unlink($file);
        }
    }

    public function getBodyBegin(Project $Project): string
    {
        return $this->combineFilesInDir(
            $this->getProjectFolder($Project, 'bodyBegin')
        );
    }

    //endregion

    //region body end

    public function addBodyEnd(Project $Project, $key, $htmlScript)
    {
        $this->setFileContent(
            $Project,
            'bodyEnd',
            $key,
            $htmlScript
        );
    }

    public function removeBodyEnd(Project $Project, $key)
    {
        $file = $this->getProjectFolder($Project, 'bodyEnd') . $key . '.html';

        if (file_exists($file)) {
            unlink($file);
        }
    }

    public function getBodyEnd(Project $Project): string
    {
        return $this->combineFilesInDir(
            $this->getProjectFolder($Project, 'bodyEnd')
        );
    }

    //endregion


    //region utils

    protected function getProjectFolder(Project $Project, string $type): string
    {
        $projectName = $Project->getName();
        $dir = $this->dir . $projectName;

        $headerBeginDir = $dir . '/headerBegin/';
        $headerEndDir = $dir . '/headerEnd/';
        $bodyEndDir = $dir . '/bodyEnd/';
        $bodyBeginDir = $dir . '/bodyBegin/';

        File::mkdir($headerBeginDir);
        File::mkdir($headerEndDir);
        File::mkdir($bodyEndDir);
        File::mkdir($bodyBeginDir);

        switch ($type) {
            case 'headerBegin':
                return $headerBeginDir;

            case 'headerEnd':
                return $headerEndDir;

            case 'bodyBegin':
                return $bodyBeginDir;

            case 'bodyEnd':
                return $bodyEndDir;
        }

        QUI\System\Log::addError('data layer folder type not known', [
            'wantedType' => $type
        ]);

        return '';
    }

    protected function combineFilesInDir($dir)
    {
        $files = File::readDir($dir);
        $result = '';

        foreach ($files as $file) {
            $result .= file_get_contents($dir . $file);
        }

        return str_replace('<script', '<script data-no-cache="1"', $result);
    }

    protected function setFileContent(Project $Project, $type, $key, $content)
    {
        $dir = $this->getProjectFolder($Project, $type);
        $file = $dir . $key . '.html';

        file_put_contents($file, $content);
    }

    //endregion
}
