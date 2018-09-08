package com.core.web.service.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {
    void store(MultipartFile file);

    Stream<Path> loadAll();

    Resource loadAsResource(String filename);
}
